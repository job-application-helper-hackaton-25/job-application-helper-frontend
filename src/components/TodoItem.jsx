import React from "react";
import clsx from "clsx";

export default function TodoItem({todo}) {
    const isOverdue =
        !todo.completed && new Date(todo.deadline) < new Date();

    const priorityStyles = {
        HIGH: "bg-red-100 text-red-700",
        MEDIUM: "bg-yellow-100 text-yellow-700",
        LOW: "bg-green-100 text-green-700",
    };

    return (
        <div
            className={clsx(
                "flex items-center gap-3 p-3 rounded-lg border mb-2 transition",
                todo.completed
                    ? "bg-gray-100 opacity-70"
                    : "bg-white hover:shadow-sm",
                isOverdue && "border-red-300"
            )}
        >
            <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="h-5 w-5"
                style={{colorScheme: "light"}}
            />

            <div className="flex-1">
                <p
                    className={clsx(
                        "text-sm font-medium",
                        todo.completed && "line-through text-gray-400"
                    )}
                >
                    {todo.content}
                </p>

                <p
                    className={clsx(
                        "text-xs",
                        isOverdue ? "text-red-500" : "text-gray-500"
                    )}
                >
                    Deadline: {todo.deadline}
                    {isOverdue && " • overdue"}
                </p>
            </div>

            <span
                className={clsx(
                    "text-xs font-semibold px-2 py-1 rounded-full",
                    priorityStyles[todo.priority] || "bg-gray-100 text-gray-600"
                )}
            >
                {todo.priority}
            </span>
        </div>
    );
}
