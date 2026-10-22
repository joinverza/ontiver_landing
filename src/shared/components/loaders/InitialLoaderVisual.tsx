import "./initial-loader.css";

type InitialLoaderVisualProps = {
  leaving: boolean;
};

const InitialLoaderVisual = ({ leaving }: InitialLoaderVisualProps) => {
  return (
    <div
      className="initial-loader"
      data-leaving={leaving ? "true" : undefined}
      role="status"
      aria-live="polite"
      aria-label="Loading Ontiver"
    >
      <div className="initial-loader__content">
        <div className="initial-loader__orb" aria-hidden="true">
          <span className="initial-loader__ring initial-loader__ring--outer" />
          <span className="initial-loader__ring initial-loader__ring--inner" />
          <span className="initial-loader__glow" />
          <img
            src="/assets/initial-loader-mark.svg"
            alt=""
            width={96}
            height={96}
            fetchPriority="high"
            className="initial-loader__mark"
          />
        </div>
        <div className="initial-loader__copy">
          <p className="initial-loader__brand">Ontiver</p>
          <p className="initial-loader__message">Preparing your Ontiver experience</p>
        </div>
        <div className="initial-loader__progress" aria-hidden="true">
          <span className="initial-loader__progress-fill" />
        </div>
      </div>
    </div>
  );
};

export default InitialLoaderVisual;
