import React from "react";

export default function TodoItem({ todo }) {
    return (
        <div className={`p-2 border rounded my-1 ${todo.completed ? "bg-green-100" : "bg-red-100"}`}>
            <p>{todo.content}</p>
            <p className="text-sm text-gray-500">Deadline: {todo.deadline} | Priority: {todo.priority}</p>
        </div>
    );
}
