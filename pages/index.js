import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import useTodos from '../hooks/useTodos';

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
            <div className="container mx-auto p-4">
                <button onClick={() => signIn('google')} className="bg-blue-500 text-white p-2 rounded">
                    Sign in with Google
                </button>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo App</h1>
            <p>Signed in as {session.user.email}</p>
            <button onClick={() => signOut()} className="bg-red-500 text-white p-2 rounded mb-4">
                Sign out
            </button>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                    className="border p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Todo</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            className="mr-2"
                        />
                        <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="ml-auto bg-red-500 text-white p-1 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}