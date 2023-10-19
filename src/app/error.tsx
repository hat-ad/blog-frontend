"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Error: React.FC = () => {
  const router = useRouter();
  return (
    <div className="bg-red-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-700 mb-4">
          We encountered an error while processing your request. Please try
          again later.
        </p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
          onClick={() => router.refresh()}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default Error;
