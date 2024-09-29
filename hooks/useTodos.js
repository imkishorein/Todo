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

    const addTodo = (text, description, date) => {
        setTodos(prevTodos => [...prevTodos, {
            id: Date.now(),
            text,
            description,
            date: date.toISOString(),
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        }]);
    };

    const toggleTodo = (id) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed, completedAt: todo.completed ? null : new Date().toISOString() } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    const updateTodoDescription = (id, description) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? { ...todo, description } : todo
        ));
    };

    const updateTodoDate = (id, date) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? { ...todo, date: date.toISOString() } : todo
        ));
    };

    return { todos, addTodo, toggleTodo, deleteTodo, updateTodoDescription, updateTodoDate };
};

export default useTodos;