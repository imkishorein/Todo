import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import useTodos from '../hooks/useTodos';
import { format, parseISO, isToday } from 'date-fns';

const Footer = () => (
    <h6 className="text-xs text-center text-gray-500 mt-8 pb-4">
        Built with ❤️ by Kishore. Powered by AI 🤖, fueled by coffee ☕️
    </h6>
);

export default function Home() {
    const { data: session } = useSession()
    const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
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
        setExpandedGroups(prev => ({...prev, [date]: !prev[date]}));
    };

    const toggleTodoExpansion = (id) => {
        setExpandedTodos(prev => ({...prev, [id]: !prev[id]}));
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
                    <h1 className="text-2xl font-bold mb-4">Welcome to Task Lite</h1>
                    <button
                        onClick={() => signIn('google')}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Sign in with Google
                    </button>
                </div>
                <Footer />
            </div>
        )
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
                        <div className="flex flex-col space-y-2">
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Add a new todo"
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="Add a description (optional)"
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            <h2 className="text-lg font-semibold">
                                {format(parseISO(date), "d MMMM yyyy (EEEE)")}
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
                                <h3 className="font-semibold mt-4 mb-2">Not Started</h3>
                                <ul className="mb-4">
                                    {notStarted.map(todo => (
                                        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} toggleExpansion={toggleTodoExpansion} isExpanded={expandedTodos[todo.id]} formatDate={formatDate} />
                                    ))}
                                </ul>
                                <h3 className="font-semibold mt-4 mb-2">Completed</h3>
                                <ul>
                                    {completed.map(todo => (
                                        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} toggleExpansion={toggleTodoExpansion} isExpanded={expandedTodos[todo.id]} formatDate={formatDate} />
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

const TodoItem = ({ todo, toggleTodo, deleteTodo, toggleExpansion, isExpanded, formatDate }) => (
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
        {isExpanded && todo.description && (
            <div className="mt-2 ml-8 text-sm text-gray-600">
                {todo.description}
            </div>
        )}
    </li>
);