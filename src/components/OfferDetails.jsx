import React, {useEffect, useState} from "react";
import {getOfferStatuses, getOfferNotes, getOfferTodos} from "../api/offersApi.js";
import TodoItem from "./TodoItem";
import {motion, AnimatePresence} from "framer-motion";
import NoteItem from "./NoteItem.jsx";
import {NOTE_STAGE_COLORS} from "../constants/stageColors.jsx";
import NewNoteInput from "./NewNoteInput.jsx";
import NewTodoItem from "./NewTodoItem.jsx";

export default function OfferDetails({userId, offer, onClose}) {
    const [statuses, setStatuses] = useState([]);
    const [notes, setNotes] = useState([]);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        if (!offer) return;

        getOfferStatuses(userId, offer.id).then(setStatuses);
        getOfferNotes(userId, offer.id).then(setNotes);
        getOfferTodos(userId, offer.id).then(setTodos);
    }, [userId, offer]);

    const handleAddTodo = (newTodo) => {
        setTodos((prevTodos) => [newTodo, ...prevTodos]);
    };

    if (!offer) return null;

    return (
        <AnimatePresence>
            <motion.div
                key={offer.id}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="fixed inset-0 flex justify-center items-center text-gray-800 bg-black/30 backdrop-blur-sm z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{scale: 0.95, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    exit={{scale: 0.95, opacity: 0}}
                    transition={{duration: 0.2}}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto p-6 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-red-500 font-bold hover:text-red-700 transition-colors"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl font-bold mb-2">{offer.jobTitle} @ {offer.companyId}</h2>
                    <p className="text-gray-600 mb-4">
                        Job Board: <a href={offer.jobBoardUrl}
                                      className="text-blue-500 hover:underline">{offer.jobBoard}</a>
                    </p>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <span
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">{offer.status}</span>
                        <span
                            className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">Priority: {offer.priority}</span>
                    </div>

                    <p className="mb-4 font-medium">Salary: Expected <span
                        className="font-bold">{offer.salary.expected}</span>, Offered <span
                        className="font-bold">{offer.salary.offered}</span></p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <section className="bg-gray-50 p-4 rounded-xl shadow-inner flex flex-col">
                            <h3 className="font-semibold mb-2">Notes</h3>
                            <div className="overflow-y-auto max-h-[60vh] scrollbar-thin pr-2 flex flex-col gap-2">
                                <NewNoteInput
                                    offerStatus={offer.status}
                                    onAdd={(newContent) => {
                                        const newNote = {
                                            id: `note-${Date.now()}`,
                                            userId,
                                            offerId: offer.id,
                                            stage: offer.status,
                                            content: newContent,
                                            date: new Date().toISOString().split("T")[0],
                                        };
                                        setNotes([newNote, ...notes]);
                                    }}
                                />

                                {notes.length ? (
                                    notes.map(n => <NoteItem key={n.id} note={n} />)
                                ) : (
                                    <p className="text-gray-400">No notes yet</p>
                                )}
                            </div>
                        </section>

                        <section className="bg-gray-50 p-4 rounded-xl shadow-inner flex flex-col">
                            <h3 className="font-semibold mb-2">Todos</h3>
                            <div className="overflow-y-auto max-h-[60vh] scrollbar-thin pr-2">
                                <NewTodoItem onAdd={handleAddTodo} />

                                {todos.length ? todos.map(t => <TodoItem key={t.id} todo={t}/>) :
                                    <p className="text-gray-400">No todos yet</p>}
                            </div>
                        </section>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
