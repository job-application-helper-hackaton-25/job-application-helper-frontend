import React from "react";
import clsx from "clsx";
import { NOTE_STAGE_COLORS } from "../constants/StageColors.jsx";

export default function NoteItem({ note, statuses }) {
    return (
        <div className={clsx(
            "bg-white p-3 rounded-lg shadow-sm mb-2 border-l-4",
            NOTE_STAGE_COLORS[note.stage].border || "border-gray-300"
        )}>
            <p className="text-sm text-gray-700 mb-1">{note.content}</p>
            <div className="flex justify-between text-xs text-gray-500">
                <span>{statuses.find(s => s.value === note.stage)?.label}</span>
                <span>{note.date}</span>
            </div>
        </div>
    );
}
