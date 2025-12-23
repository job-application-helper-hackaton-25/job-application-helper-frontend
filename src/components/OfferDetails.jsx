import React, {useEffect, useState} from "react";
import {getOfferNotes, getOfferTodos} from "../api/offersApi.js";
import TodoItem from "./TodoItem";
import {motion, AnimatePresence} from "framer-motion";
import NoteItem from "./NoteItem.jsx";
import {NOTE_STAGE_COLORS} from "../constants/StageColors.jsx";
import NewNoteInput from "./NewNoteInput.jsx";
import NewTodoItem from "./NewTodoItem.jsx";
import Expandable from "../scripts/Expandable.jsx";
import {getOffersStatuses} from "../api/offersApi-real.js";

export default function OfferDetails({userId, offer, onClose}) {
    const [statuses, setStatuses] = useState([]);
    const [notes, setNotes] = useState([]);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        if (!offer) return;

        getOffersStatuses(userId, offer.id).then(setStatuses);
        getOfferNotes(userId, offer.id).then(setNotes);
        getOfferTodos(userId, offer.id).then(setTodos);
    }, [userId, offer]);

    const handleAddTodo = (newTodo) => {
        setTodos((prevTodos) => [newTodo, ...prevTodos]);
    };

    if (!offer) return null;

    function getStatusProgress(status) {
        const index = statuses.findIndex(s => s.value === status);
        if (index === -1) return 0;
        return ((index + 1) / statuses.length) * 100;
    }

    return (<AnimatePresence>
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
                className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto relative "
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-6 w-full relative">
                    <div className="w-full h-4 bg-gray-200 overflow-hidden relative overflow-hidden border-radius">
                        <div
                            className={`h-4 ${NOTE_STAGE_COLORS[offer.status].bg400} relative`}
                            style={{
                                width: `${getStatusProgress(offer.status)}%`,
                                transition: "width 0.3s ease-in-out"
                        }}
                        >
                        <span
                            className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white pointer-events-none">
                            {statuses.find(s => s.value === offer.status)?.label}
                        </span>
                        </div>
                    </div>
                </div>


                <div className="p-6">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-red-500 font-bold hover:text-red-700 transition-colors"
                    >
                        ✕
                    </button>

                    <div className="flex items-center justify-center gap-4 mb-4">
                        {offer.companyImage && (<img
                            src={offer.companyImage}
                            alt={offer.companyName}
                            className="w-14 h-14 rounded-full object-contain bg-white"
                        />)}

                        <div>
                            <h2 className="text-2xl font-bold">
                                {offer.position} @ {offer.companyName}
                            </h2>

                            <p className="text-gray-600 text-sm">
                                Published: {offer.publishDate}
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-4">
                        Job Board:&nbsp;
                        <a
                            href={offer.linkToTheOffer}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline break-all"
                        >
                            {offer.linkToTheOffer}
                        </a>
                    </p>

                    <div className="flex flex-wrap gap-3 mb-6 items-center">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                            {offer.jobType}
                        </span>

                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
                            {offer.agreementType}
                        </span>

                        {offer.salary && (
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">
                                Salary: {offer.salary}
                            </span>)}
                    </div>

                    <Expandable description={offer.description}/>

                    <div className="grid md:grid-cols-2 gap-4">
                        <section className="bg-gray-100 p-4 rounded-xl shadow-inner flex flex-col">
                            <h3 className="font-semibold mb-2">Notes</h3>
                            <div className="overflow-y-auto max-h-[45vh] scrollbar-thin pr-2 flex flex-col gap-2">
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

                                {notes.length ? (notes.map(n => <NoteItem key={n.id} note={n} statuses={statuses}/>)) : (
                                    <p className="text-gray-400">No notes yet</p>)}
                            </div>
                        </section>

                        <section className="bg-gray-100 p-4 rounded-xl shadow-inner flex flex-col">
                            <h3 className="font-semibold mb-2">Todos</h3>
                            <div className="overflow-y-auto max-h-[45vh] scrollbar-thin pr-2">
                                <NewTodoItem onAdd={handleAddTodo}/>

                                {todos.length ? todos.map(t => <TodoItem key={t.id} todo={t}/>) :
                                    <p className="text-gray-400">No todos yet</p>}
                            </div>
                        </section>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    </AnimatePresence>);
}
