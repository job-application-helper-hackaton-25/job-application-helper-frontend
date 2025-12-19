import React from "react";
import clsx from "clsx";
import { NOTE_STAGE_COLORS } from "../constants/stageColors.jsx";

export default function NoteItem({ note }) {
    return (
        <div className={clsx(
            "bg-white p-3 rounded-lg shadow-sm mb-2 border-l-4",
            NOTE_STAGE_COLORS[note.stage].border || "border-gray-300"
        )}>
            <p className="text-sm text-gray-700 mb-1">{note.content}</p>
            <div className="flex justify-between text-xs text-gray-500">
                <span>{note.stage}</span>
                <span>{note.date}</span>
            </div>
        </div>
    );
}
