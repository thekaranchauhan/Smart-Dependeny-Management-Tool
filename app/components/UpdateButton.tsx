import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateButton() {
  const handleUpdate = async () => {
    const userConfirmed = window.confirm('Do you want to update dependencies?');
    if (!userConfirmed) {
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              updateDependencies(confirm: true)
            }
          `,
        }),
      });

      const data = await response.json();
      toast.info(data.data.updateDependencies);
    } catch (error) {
      toast.error('Failed to update dependencies.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleUpdate}
        className="p-3 bg-secondary text-white rounded-lg shadow-md hover:bg-accent transition duration-300"
      >
        Update Dependencies
      </button>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
}