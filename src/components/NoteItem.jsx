import React from "react";
import clsx from "clsx";
import { NOTE_STAGE_COLORS } from "../constants/StageColors.jsx";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function NoteItem({ note, statuses, onDelete }) {
    return (
        <div className={clsx(
            "bg-white p-3 rounded-lg shadow-sm mb-2 border-l-4",
            NOTE_STAGE_COLORS[note.stage].border || "border-gray-300"
        )}>
            <p className="text-sm text-gray-700 mb-2">{note.content}</p>

            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                <span className="font-semibold pl-2">{statuses.find(s => s.value === note.stage)?.label}</span>

                <div className="flex items-center gap-2">
                    <span>
                        {new Date(note.date).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </span>
                    <button
                        onClick={() => onDelete(note.id)}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                        title="Delete note"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
