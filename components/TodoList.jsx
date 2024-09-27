import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

const TodoList = () => {
    const { data: session } = useSession();
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        // Load todos from localStorage when component mounts
        if (session?.user?.email) {
            const storedTodos = JSON.parse(localStorage.getItem(session.user.email) || '[]');
            setTodos(storedTodos);
        }
    }, [session]);

    useEffect(() => {
        // Save todos to localStorage whenever they change
        if (session?.user?.email) {
            localStorage.setItem(session.user.email, JSON.stringify(todos));
        }
    }, [todos, session]);

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, { text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    const toggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const removeTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    if (!session) return null;

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4">Your Todos</h2>
            <div className="flex mb-4">
                <Input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter a new todo"
                    className="flex-grow mr-2"
                />
                <Button onClick={addTodo}>Add</Button>
            </div>
            <ul className="space-y-2">
                {todos.map((todo, index) => (
                    <li key={index} className="flex items-center">
                        <Checkbox
                            checked={todo.completed}
                            onChange={() => toggleTodo(index)}
                            className="mr-2"
                        />
                        <span className={todo.completed ? 'line-through flex-grow' : 'flex-grow'}>{todo.text}</span>
                        <Button variant="ghost" onClick={() => removeTodo(index)}>
                            Remove
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;