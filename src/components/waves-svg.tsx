"use client";

const WavesSVG = () => {
  return (
    <div className="mx-auto h-5 w-full md:w-1/2">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        overflow="auto"
        shapeRendering="auto"
        fill="#ffffff"
      >
        <defs>
          <path
            id="wavepath"
            d="M 0 2000 0 500 Q 50 100 100 500 t 100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0  v1000 z"
          />
          <path id="motionpath" d="M -200 0 0 0" />
        </defs>
        <g>
          <use xlinkHref="#wavepath" y="-233" fill="hsl(var(--primary))">
            <animateMotion dur="5s" repeatCount="indefinite">
              <mpath xlinkHref="#motionpath" />
            </animateMotion>
          </use>
        </g>
      </svg>
    </div>
  );
};

export default WavesSVG;
