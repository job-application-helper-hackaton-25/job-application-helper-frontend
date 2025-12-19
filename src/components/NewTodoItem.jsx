import React, { useState } from "react";
import clsx from "clsx";

export default function NewTodoItem({ onAdd }) {
    const [content, setContent] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("MEDIUM");

    const handleAdd = () => {
        if (!content.trim()) return;

        const newTodo = {
            id: `todo-${Date.now()}`,
            userId: "123",
            offerId: "1",
            content,
            deadline: deadline || null,
            priority,
            completed: false,
        };

        onAdd(newTodo);

        setContent("");
        setDeadline("");
        setPriority("MEDIUM");
    };

    const priorityStyles = {
        HIGH: "bg-red-100 text-red-700",
        MEDIUM: "bg-yellow-100 text-yellow-700",
        LOW: "bg-green-100 text-green-700",
    };


    // todo move priorities colors to constants file (currently in many places)
    const selectBgColors = {
        HIGH: "#fee2e2",
        MEDIUM: "#fef3c7",
        LOW: "#dcfce7"
    };

    return (
        <div className="flex flex-col gap-2 p-3 rounded-lg bg-white border border-gray-300 mb-2">
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="New todo..."
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />

            <div className="flex gap-2 items-center">
                <div className="flex-1 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Deadline (optional):</span>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className={clsx(
                            "p-1 rounded-3xl focus:outline-none text-xs font-bold",
                            priorityStyles[priority] || "bg-gray-100 text-gray-800"
                        )}
                        style={{ backgroundColor: selectBgColors[priority] }}
                    >
                        <option value="HIGH">HIGH</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="LOW">LOW</option>
                    </select>
                </div>

                <button
                    onClick={handleAdd}
                    className={clsx(
                        "px-3 py-1 ml-20 rounded font-semibold text-sm border-2 border-gray-700 border-solid bg-gray-100 text-gray-800"
                    )}
                >
                    Add
                </button>
            </div>
        </div>
    );
}
