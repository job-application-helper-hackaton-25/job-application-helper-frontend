import React, { useState, useRef, useEffect } from "react";
import { NOTE_STAGE_COLORS } from "../constants/StageColors.jsx";

export default function NewNoteInput({ offerStatus, onAdd }) {
    const [content, setContent] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [content]);

    const handleAdd = () => {
        if (!content.trim()) return;
        onAdd(content);
        setContent("");
    };

    return (
        <div
            className={`p-3 rounded-xl shadow-md border-l-4 flex flex-col gap-2 ${NOTE_STAGE_COLORS[offerStatus].bg} ${NOTE_STAGE_COLORS[offerStatus].border}`}
        >
            <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a new note..."
                className="w-full resize-none overflow-hidden bg-transparent border-none focus:ring-0 text-sm text-gray-800"
            />
            <button
                onClick={handleAdd}
                className={`self-end px-3 py-1 rounded-xl text-white text-xs font-semibold transition-colors ${NOTE_STAGE_COLORS[offerStatus].bg400}`}
            >
                Add
            </button>
        </div>
    );
}
