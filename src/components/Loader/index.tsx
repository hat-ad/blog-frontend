import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className={`animate-spin h-5 w-5 mr-3 text-indigo-600`}
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx={12}
          cy={12}
          r={10}
          stroke="currentColor"
          strokeWidth={4}
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.416a8.001 8.001 0 004.48 7.072 8.001 8.001 0 007.072-4.48H6z"
        />
      </svg>
      <span>Processing...</span>
    </div>
  );
};

export default Loader;
