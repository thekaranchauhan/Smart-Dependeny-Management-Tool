import React from 'react';

export default function Spinner () {
  return (
    <div className="loader">
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3; /* Light grey */
          border-top: 8px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div className="w-full flex justify-center items-center h-full">
        <div className="loader" />
      </div>
    </div>
  );
};

