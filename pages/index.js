import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import useTodos from '../hooks/useTodos';
import { format } from 'date-fns';

export default function Home() {
    const { data: session } = useSession()
    const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
    const [newTodo, setNewTodo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            addTodo(newTodo.trim());
            setNewTodo('');
        }
    };

    if (!session) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Welcome to Todoist-like App</h1>
                    <button
                        onClick={() => signIn('google')}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <img
                                src={session.user.image}
                                alt="Profile"
                                className="w-10 h-10 rounded-full mr-4"
                            />
                            <h1 className="text-xl font-semibold">{session.user.name} Todo List</h1>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                        >
                            Sign out
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="flex">
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Add a new todo"
                                className="flex-grow border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                            >
                                Add Todo
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <ul>
                        {todos.map(todo => (
                            <li key={todo.id} className="flex items-center py-3 border-b last:border-b-0">
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
                                        Created: {format(new Date(todo.id), 'MMM d, yyyy')}
                                    </p>
                                </div>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}