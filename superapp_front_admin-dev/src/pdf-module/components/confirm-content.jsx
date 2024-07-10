import React from 'react';

// Define the ConfirmContent functional component
export const ConfirmContent = ({
  title,
  onConfirm,
  onDismiss,
}) => (
  <div className="text-white">
    {/* Render the title */}
    <h4 className="text-lg font-semibold">{title}</h4>

    {/* Render the "No" button */}
    {/* <button className="mt-4 mr-4 px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded" onClick={onDismiss}>
      No
    </button> */}

    {/* Render the "Yes" button with negative styling */}
    <button className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded" onClick={onConfirm}>
      X
    </button>
  </div>
);
