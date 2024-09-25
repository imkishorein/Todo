import TodoList from '../components/TodoList'

export default function Home() {
  return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <TodoList />
      </div>
  )
}