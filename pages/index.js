/*import TodoList from '../components/TodoList'

export default function Home() {
  return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <TodoList />
      </div>
  )
}*/
// import { useSession, signIn, signOut } from "next-auth/react"
// import TodoList from '../components/TodoList'
//
// export default function Home() {
//     const { data: session } = useSession()
//
//     if (session) {
//         return (
//             <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center justify-center sm:py-12">
//                 <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 space-y-4">
//                     <h1 className="text-2xl font-bold text-center">Welcome, {session.user.name}</h1>
//                     <img src={session.user.image} alt={session.user.name} className="w-20 h-20 rounded-full mx-auto" />
//                     <button onClick={() => signOut()} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">Sign out</button>
//                     <TodoList />
//                 </div>
//             </div>
//         )
//     }
//
//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
//             <div className="bg-white p-8 rounded-lg shadow-md">
//                 <h1 className="text-2xl font-bold mb-4 text-center">Welcome to Todo App</h1>
//                 <button onClick={() => signIn('google')} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
//                     Sign in with Google
//                 </button>
//             </div>
//         </div>
//     )
// }
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