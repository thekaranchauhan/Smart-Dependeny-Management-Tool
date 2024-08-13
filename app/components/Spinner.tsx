import React from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <FaSpinner className="animate-spin text-4xl text-accent" />
    </div>
  );
}