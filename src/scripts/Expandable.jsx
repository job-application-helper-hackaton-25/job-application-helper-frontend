import { useEffect, useRef, useState } from "react";

export default function Expandable({ description, maxLines = 3 }) {
    const [expanded, setExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;
        const el = textRef.current;

        const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        const maxHeight = lineHeight * maxLines;

        setIsOverflowing(el.scrollHeight > maxHeight);
    }, [description, maxLines]);

    const handleClick = () => {
        if (isOverflowing) {
            setShowPopup(true);
        } else {
            setExpanded(prev => !prev);
        }
    };

    return (
        <>
            <div className="mb-7 flex flex-col">
                <p
                    ref={textRef}
                    className={`text-gray-700 leading-relaxed whitespace-pre-line transition-all ${
                        expanded ? "" : `line-clamp-${maxLines}`
                    }`}
                >
                    {description}
                </p>

                {(isOverflowing || expanded) && (
                    <div className="flex justify-center mt-1">
                        <button
                            onClick={handleClick}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            {expanded ? "Show less" : "Show more"}
                        </button>
                    </div>
                )}
            </div>

            {showPopup && (
                <div
                    className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
                    onClick={() => setShowPopup(false)}
                >
                    <div
                        className="relative bg-white p-6 rounded-2xl max-w-3xl max-h-[80vh] w-full"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 text-red-500 font-bold hover:text-red-700 transition-colors z-10"
                        >
                            ✕
                        </button>

                        <div className="overflow-y-auto max-h-[75vh] pr-2">
                            <p className="text-gray-800 whitespace-pre-line">{description}</p>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
