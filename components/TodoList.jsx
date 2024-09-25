import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

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

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Kishore's Todo List</h1>
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