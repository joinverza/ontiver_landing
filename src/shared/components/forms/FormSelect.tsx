import ActionIcon from "../ui/ActionIcon";
import { useCallback, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";
import { cancelScrollMomentum } from "../../lib/scrollNavigation";
import { useSelectPopover } from "./useSelectPopover";
import "./form-select.css";

type SelectOption = { value: string; label: string; disabled?: boolean };
type FormSelectProps = {
  id?: string;
  name?: string;
  label: string;
  value: string;
  options: readonly SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  allowEmpty?: boolean;
  disabled?: boolean;
  className?: string;
};

export const FormSelect = ({
  id,
  name,
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  required = false,
  allowEmpty = true,
  disabled = false,
  className = "",
}: FormSelectProps) => {
  const generatedId = useId();
  const fieldId = id ?? `select-${generatedId}`;
  const listId = `${fieldId}-options`;
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const search = useRef({ text: "", time: 0 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [invalid, setInvalid] = useState(false);
  const items = options.some((option) => option.value === "")
    ? options
    : [{ value: "", label: placeholder, disabled: required || !allowEmpty }, ...options];
  const selected = items.findIndex((option) => option.value === value);
  const close = useCallback(() => setOpen(false), []);
  useSelectPopover(open, trigger, menu, close);

  useLayoutEffect(() => {
    if (!open) return;
    const popup = menu.current;
    const option = popup?.querySelector<HTMLElement>(`[data-active="true"]`);
    if (!popup || !option) return;
    if (option.offsetTop < popup.scrollTop) popup.scrollTop = option.offsetTop;
    else if (option.offsetTop + option.offsetHeight > popup.scrollTop + popup.clientHeight)
      popup.scrollTop = option.offsetTop + option.offsetHeight - popup.clientHeight;
  }, [open, active]);

  const show = (index = selected) => {
    if (disabled || trigger.current?.matches(":disabled")) return;
    cancelScrollMomentum();
    setActive(
      index >= 0 && !items[index]?.disabled ? index : items.findIndex((item) => !item.disabled),
    );
    setOpen(true);
  };
  const choose = (index: number) => {
    const option = items[index];
    if (!option || option.disabled) return;
    onChange(option.value);
    setInvalid(false);
    close();
    trigger.current?.focus({ preventScroll: true });
  };
  const move = (direction: number) => {
    let index = active + direction;
    while (index >= 0 && index < items.length && items[index].disabled) index += direction;
    if (index >= 0 && index < items.length) setActive(index);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      if (event.key === "Home") show(items.findIndex((item) => !item.disabled));
      else if (event.key === "End") {
        let last = items.length - 1;
        while (last >= 0 && items[last].disabled) last--;
        show(last);
      } else if (!open) show();
      else move(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(active);
      else show();
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      close();
    } else if (event.key === "Tab" && open) {
      choose(active);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const time = Date.now();
      const text = time - search.current.time > 700 ? event.key : search.current.text + event.key;
      search.current = { text, time };
      const query = text.toLocaleLowerCase();
      const repeated = [...query].every((letter) => letter === query[0]);
      const prefix = repeated ? query[0] : query;
      const start = repeated ? (open ? active : selected) + 1 : 0;
      for (let offset = 0; offset < items.length; offset++) {
        const index = (start + offset + items.length) % items.length;
        if (!items[index].disabled && items[index].label.toLocaleLowerCase().startsWith(prefix)) {
          show(index);
          break;
        }
      }
    }
  };

  return (
    <span className={`form-select ${className}`}>
      <button
        ref={trigger}
        id={fieldId}
        type="button"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${fieldId}-error` : undefined}
        disabled={disabled}
        className="form-select-trigger"
        data-placeholder={!value || undefined}
        onKeyDown={onKeyDown}
        onClick={() => (open ? close() : show())}
      >
        <span>{items[selected]?.label ?? placeholder}</span>
        <ActionIcon direction="down" size={19} aria-hidden="true" />
      </button>
      <select
        className="form-select-native"
        tabIndex={-1}
        aria-hidden="true"
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        onChange={(event) => {
          onChange(event.target.value);
          setInvalid(false);
        }}
        onInvalid={(event) => {
          event.preventDefault();
          setInvalid(true);
          trigger.current?.focus();
        }}
      >
        {items.map((item) => (
          <option key={item.value} value={item.value} disabled={item.disabled}>
            {item.label}
          </option>
        ))}
      </select>
      {invalid && (
        <span id={`${fieldId}-error`} className="form-select-error">
          Please select an option.
        </span>
      )}
      {open &&
        createPortal(
          <div
            ref={menu}
            id={listId}
            role="listbox"
            aria-label={label}
            className="form-select-menu"
            data-lenis-prevent
            onWheel={cancelScrollMomentum}
            onTouchStart={cancelScrollMomentum}
            onPointerDown={(event) => {
              if (event.pointerType === "mouse") event.preventDefault();
            }}
          >
            {items.map((item, index) => (
              <div
                key={item.value}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={item.value === value}
                aria-disabled={item.disabled || undefined}
                data-active={active === index}
                className="form-select-option"
                onPointerMove={(event) => {
                  if (event.pointerType === "mouse" && !item.disabled) setActive(index);
                }}
                onClick={() => choose(index)}
              >
                <span>{item.label}</span>
                {item.value === value && <Check size={18} aria-hidden="true" />}
              </div>
            ))}
          </div>,
          document.body,
        )}
    </span>
  );
};
