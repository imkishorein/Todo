// hooks/useTodos.js
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"

const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const { data: session } = useSession()

    useEffect(() => {
        if (session?.user?.email) {
            const storedTodos = localStorage.getItem(`todos_${session.user.email}`);
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            }
        }
    }, [session]);

    useEffect(() => {
        if (session?.user?.email) {
            localStorage.setItem(`todos_${session.user.email}`, JSON.stringify(todos));
        }
    }, [todos, session]);

    const addTodo = (text, description) => {
        setTodos([...todos, {
            id: Date.now(),
            text,
            description,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        }]);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed, completedAt: todo.completed ? null : new Date().toISOString() } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return { todos, addTodo, toggleTodo, deleteTodo };
};

export default useTodos;