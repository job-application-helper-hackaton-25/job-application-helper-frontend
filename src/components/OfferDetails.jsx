import React, {useEffect, useState} from "react";
import {getOfferStatuses, getOfferNotes, getOfferTodos} from "../api/offersApi-real";
import TodoItem from "./TodoItem";
import {motion, AnimatePresence} from "framer-motion";

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
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative"
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

                    <div className="grid md:grid-cols-3 gap-4">
                        <section className="bg-gray-50 p-4 rounded-xl shadow-inner">
                            <h3 className="font-semibold mb-2">Statuses</h3>
                            {statuses.length ? (
                                statuses.map(s => <p key={s.id}
                                                     className="text-gray-700 text-sm mb-1">{s.date}: {s.status}</p>)
                            ) : <p className="text-gray-400">No statuses yet</p>}
                        </section>

                        <section className="bg-gray-50 p-4 rounded-xl shadow-inner">
                            <h3 className="font-semibold mb-2">Notes</h3>
                            {notes.length ? (
                                notes.map(n => <p key={n.id}
                                                  className="text-gray-700 text-sm mb-1">{n.date} ({n.stage}): {n.content}</p>)
                            ) : <p className="text-gray-400">No notes yet</p>}
                        </section>

                        <section className="bg-gray-50 p-4 rounded-xl shadow-inner">
                            <h3 className="font-semibold mb-2">Todos</h3>
                            {todos.length ? todos.map(t => <TodoItem key={t.id} todo={t}/>) :
                                <p className="text-gray-400">No todos yet</p>}
                        </section>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
