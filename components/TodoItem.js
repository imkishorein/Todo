import { useState } from 'react';
import { format } from 'date-fns';
import BottomSheet from './BottomSheet'; // Adjust the path if necessary

const TodoItem = ({ todo, toggleTodo, deleteTodo, toggleExpansion, isExpanded, updateTodoDescription }) => {
    const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
    const [description, setDescription] = useState(todo.description || '');

    const openBottomSheet = () => {
        setBottomSheetOpen(true);
    };

    const closeBottomSheet = () => {
        setBottomSheetOpen(false);
    };

    const handleDescriptionSubmit = () => {
        if (description.trim()) {
            updateTodoDescription(todo.id, description);
            closeBottomSheet();
        }
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
                        Created: {format(new Date(todo.createdAt), "EEEE, d MMMM yyyy")}
                        {todo.completed && ` • Completed: ${format(new Date(todo.completedAt), "EEEE, d MMMM yyyy")}`}
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
                <>
                    {todo.description ? (
                        <div className="mt-2">
                            <div className="border-dotted border-t border-gray-300 pt-2">
                                {todo.description}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center mt-4">
                            <img
                                src="https://some-free-illustration-url.com/illustration.png" // Replace with a valid URL
                                alt="No description"
                                className="w-48 h-48 object-contain"
                            />
                            <p className="text-gray-600 mt-4">No description found</p>
                            <button
                                onClick={openBottomSheet}
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Add Description
                            </button>
                        </div>
                    )}
                </>
            )}

            {isBottomSheetOpen && (
                <BottomSheet
                    todoId={todo.id}
                    description={description}
                    setDescription={setDescription}
                    onClose={closeBottomSheet}
                    onSubmit={handleDescriptionSubmit}
                />
            )}
        </li>
    );
};

export default TodoItem;
