const WordReveal = ({ children, className = "" }: { children: string; className?: string }) => {
  return (
    <p
      className={`word-reveal section-heading ${className}`}
      data-word-reveal
      aria-label={children}
    >
      {children.split(" ").map((word, index) => (
        <span key={index} aria-hidden="true">
          {word}{" "}
        </span>
      ))}
    </p>
  );
};

export default WordReveal;
