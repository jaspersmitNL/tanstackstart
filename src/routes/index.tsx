import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <br />
      <Link to="/todos">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Go to Todos
        </button>
      </Link>
    </div>
  );
}
