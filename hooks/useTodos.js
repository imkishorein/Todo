import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"

const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const { data: session } = useSession()

    useEffect(() => {
        if (session?.user?.email) {
            // Load todos from localStorage when the component mounts and user is authenticated
            const storedTodos = localStorage.getItem(`todos_${session.user.email}`);
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            }
        }
    }, [session]);

    useEffect(() => {
        if (session?.user?.email) {
            // Save todos to localStorage whenever they change
            localStorage.setItem(`todos_${session.user.email}`, JSON.stringify(todos));
        }
    }, [todos, session]);

    const addTodo = (text) => {
        setTodos([...todos, { id: Date.now(), text, completed: false }]);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return { todos, addTodo, toggleTodo, deleteTodo };
};

export default useTodos;
