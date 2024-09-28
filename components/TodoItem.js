import { useState } from 'react';
import { Dialog } from '@headlessui/react';

const TodoItem = ({ todo, toggleTodo, deleteTodo, toggleExpansion, isExpanded, formatDate, updateTodoDescription }) => {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [newDescription, setNewDescription] = useState('');

    const openBottomSheet = () => setIsBottomSheetOpen(true);
    const closeBottomSheet = () => setIsBottomSheetOpen(false);

    const handleSubmitDescription = () => {
        updateTodoDescription(todo.id, newDescription);
        closeBottomSheet();
    };

    return (
        <li className="py-3 border-b last:border-b-0">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="mr-3 form-checkbox h-5 w-5 text-blue-600"
                />
                <div className="flex-grow">
                    <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                        {todo.text}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                        Created: {formatDate(todo.createdAt)}
                        {todo.completed && ` • Completed: ${formatDate(todo.completedAt)}`}
                    </p>
                </div>
                <button
                    onClick={() => toggleExpansion(todo.id)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                >
                    <svg className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {isExpanded && (
                <div className="mt-2">
                    {!todo.description ? (
                        <div className="flex flex-col items-center">
                            <img
                                src="https://undraw.co/illustration-url"
                                alt="No Description Illustration"
                                className="w-32 h-32 mb-4"
                            />
                            <p className="text-gray-500 mb-4">No description found</p>
                            <button
                                onClick={openBottomSheet}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Add Description
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="border-t-2 border-dotted border-gray-300 mt-2 mb-2"></div>
                            <div className="ml-8 text-sm text-gray-600">
                                {todo.description}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {isBottomSheetOpen && (
                <Dialog open={isBottomSheetOpen} onClose={closeBottomSheet} className="fixed inset-0 flex items-end justify-center">
                    <div className="bg-white rounded-t-lg p-6 shadow-lg w-full max-w-md">
                        <Dialog.Title className="text-lg font-semibold text-gray-800">Add Description</Dialog.Title>
                        <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="Enter a description"
                            className="w-full border border-gray-300 rounded-md p-2 mt-4"
                            rows="3"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleSubmitDescription}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Save
                            </button>
                            <button
                                onClick={closeBottomSheet}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Dialog>
            )}
        </li>
    );
};

export default TodoItem;
