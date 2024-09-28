import React from 'react';

const BottomSheet = ({ todoId, description, setDescription, onClose, onSubmit }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 rounded-t-lg">
            <h2 className="text-lg font-semibold mb-2">Add Description</h2>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
            />
            <div className="flex justify-end mt-4">
                <button
                    onClick={onSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Save
                </button>
                <button
                    onClick={onClose}
                    className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default BottomSheet;
