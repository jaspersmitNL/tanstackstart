import { queryClient } from "#/integrations/tanstack-query/root-provider";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Suspense } from "react";

const loaderFn = createServerFn().handler(async () => {
  console.log("loaderFn called");
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    todos: [
      { id: 1, title: "Learn tanstack " + Math.random() },
      { id: 2, title: "Build something awesome " + Math.random() },
    ],
  };
});

export const Route = createFileRoute("/todos/")({
  component: RouteComponent,
});

function Todos() {
  const { data } = useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: loaderFn,
    gcTime: 1,
  });

  return (
    <div>
      <h2>todos:</h2>
      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <hr />
    </div>
  );
}

function RouteComponent() {
  return (
    <div>
      <h1>Todos</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Todos />
      </Suspense>
      <br />
      <Link to="/">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Back to Home
        </button>
      </Link>
      <button onClick={() => queryClient.resetQueries({ queryKey: ["todos"] })}>
        click me to refetch todos
      </button>
    </div>
  );
}
