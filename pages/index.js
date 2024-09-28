import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import useTodos from '../hooks/useTodos';
import { format, parseISO, isToday } from 'date-fns';
import TodoItem from '../components/TodoItem';

const Footer = () => (
    <h6 className="text-xs text-center text-gray-500 mt-8 pb-4">
        Built with ❤️ by Kishore. Powered by AI 🤖, fueled by coffee ☕️
    </h6>
);

export default function Home() {
    const { data: session } = useSession();
    const { todos, addTodo, toggleTodo, deleteTodo, setTodos } = useTodos();
    const [newTodo, setNewTodo] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [expandedGroups, setExpandedGroups] = useState({});
    const [expandedTodos, setExpandedTodos] = useState({});

    useEffect(() => {
        // Expand current date by default
        const currentDate = format(new Date(), 'yyyy-MM-dd');
        setExpandedGroups(prev => ({ ...prev, [currentDate]: true }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            addTodo(newTodo.trim(), newDescription.trim());
            setNewTodo('');
            setNewDescription('');
        }
    };

    const toggleGroup = (date) => {
        setExpandedGroups(prev => ({ ...prev, [date]: !prev[date] }));
    };

    const toggleTodoExpansion = (id) => {
        setExpandedTodos(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const updateTodoDescription = (id, description) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, description } : todo
            )
        );
    };

    const groupedTodos = todos.reduce((groups, todo) => {
        const date = format(parseISO(todo.createdAt), 'yyyy-MM-dd');
        if (!groups[date]) {
            groups[date] = { completed: [], notStarted: [] };
        }
        if (todo.completed) {
            groups[date].completed.push(todo);
        } else {
            groups[date].notStarted.push(todo);
        }
        return groups;
    }, {});

    const formatDate = (dateString) => {
        return format(parseISO(dateString), "EEEE, d MMMM yyyy");
    };

    if (!session) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome to Task Lite</h1>
                    <button
                        onClick={() => signIn('google')}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Sign in with Google
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
            <div className="max-w-4xl mx-auto flex-grow">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <img
                                src={session.user.image}
                                alt="Profile"
                                className="w-10 h-10 rounded-full mr-4"
                            />
                            <h1 className="text-xl font-semibold text-gray-800">{session.user.name} Todo List</h1>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                        >
                            Sign out
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="flex flex-col space-y-2">
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Add a new todo"
                                className="text-gray-800 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="Add a description (optional)"
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                rows="3"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Add Todo
                            </button>
                        </div>
                    </form>
                </div>

                {Object.entries(groupedTodos).map(([date, { completed, notStarted }]) => (
                    <div key={date} className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => toggleGroup(date)}
                        >
                            <h2 className="text-lg font-semibold text-gray-800">
                                {format(parseISO(date), "d MMMM yyyy, EEEE")}
                                {isToday(parseISO(date)) && " (Today)"}
                            </h2>
                            <svg
                                className={`w-6 h-6 transition-transform duration-200 ${expandedGroups[date] ? 'transform rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        {expandedGroups[date] && (
                            <>
                                <h3 className="font-semibold mt-4 mb-2 text-gray-500">Not Started</h3>
                                <ul className="mb-4">
                                    {notStarted.map(todo => (
                                        <TodoItem
                                            key={todo.id}
                                            todo={todo}
                                            toggleTodo={toggleTodo}
                                            deleteTodo={deleteTodo}
                                            toggleExpansion={toggleTodoExpansion}
                                            isExpanded={expandedTodos[todo.id]}
                                            formatDate={formatDate}
                                            updateTodoDescription={updateTodoDescription}
                                        />
                                    ))}
                                </ul>
                                <h3 className="font-semibold mt-4 mb-2 text-gray-500">Completed</h3>
                                <ul>
                                    {completed.map(todo => (
                                        <TodoItem
                                            key={todo.id}
                                            todo={todo}
                                            toggleTodo={toggleTodo}
                                            deleteTodo={deleteTodo}
                                            toggleExpansion={toggleTodoExpansion}
                                            isExpanded={expandedTodos[todo.id]}
                                            formatDate={formatDate}
                                            updateTodoDescription={updateTodoDescription}
                                        />
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
