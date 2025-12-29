import React, {useEffect, useState} from "react";
import TodoItem from "./TodoItem";
import {motion, AnimatePresence} from "framer-motion";
import NoteItem from "./NoteItem.jsx";
import {NOTE_STAGE_COLORS} from "../constants/StageColors.jsx";
import NewNoteInput from "./NewNoteInput.jsx";
import NewTodoItem from "./NewTodoItem.jsx";
import Expandable from "../scripts/Expandable.jsx";
import {getOffersStatuses, deleteOffer} from "../api/offersApi-real.js";
import {createOfferNote, deleteOfferNote, getOfferNotes} from "../api/notesApi.js";
import {createOfferTodo, deleteOfferTodo, getOfferTodos} from "../api/todosApi.js";
import ConfirmDeleteModal from "./ConfirmDeleteModal.jsx";

export default function OfferDetails({userId, offer, onClose, onDeleted}) {
    const [statuses, setStatuses] = useState([]);
    const [notes, setNotes] = useState([]);
    const [todos, setTodos] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };

    useEffect(() => {
        if (!offer) return;

        getOffersStatuses(userId, offer.id).then(setStatuses);
        getOfferNotes(offer.id).then(setNotes);
        getOfferTodos(offer.id).then(setTodos);
    }, [userId, offer]);

    if (!offer) return null;

    const handleDeleteOffer = async () => {
        try {
            await deleteOffer(offer.id);
            onDeleted(offer.id);
            onClose();
        } catch (e) {
            console.error(e);
            alert("Failed to delete offer");
        }
    };

    const handleAddTodo = async (newTodo) => {
        try {
            const todoToSave = {
                userId,
                offerId: offer.id,
                completed: false,
                ...newTodo
            };

            const id = await createOfferTodo(offer.id, todoToSave);

            const fullTodo = {
                id,
                ...todoToSave
            };

            setTodos(prev => [fullTodo, ...prev]);
        } catch (err) {
            console.error("Failed to create todo", err);
            alert("Could not save todo");
        }
    };

    const handleAddNote = async (content) => {
        try {
            const noteToSave = {
                stage: offer.status,
                content: content,
                userId: userId,
                offerId: offer.id,
                date: new Date().toISOString(),
            };

            const id = await createOfferNote(offer.id, noteToSave);
            const fullNote = {
                id,
                ...noteToSave,
            };

            setNotes(prev => [fullNote, ...prev]);
        } catch (err) {
            console.error("Failed to create note", err);
            alert("Could not save note");
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await deleteOfferNote(offer.id, noteId);
            setNotes(prev => prev.filter(n => n.id !== noteId));
        } catch (err) {
            console.error("Failed to delete note", err);
            alert("Could not delete note");
        }
    };

    const handleDeleteTodo = async (todoId) => {
        try {
            await deleteOfferTodo(offer.id, todoId);
            setTodos(prev => prev.filter(n => n.id !== todoId));
        } catch (err) {
            console.error("Failed to delete todo", err);
            alert("Could not delete todo");
        }
    };

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
                    <div className="absolute top-4 right-4 flex gap-2 mt-3">
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="text-sm px-3 py-1 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
                        >
                            Delete
                        </button>

                        <button
                            onClick={onClose}
                            className="text-red-500 font-bold hover:text-red-700 transition-colors"
                        >
                            ✕
                        </button>
                    </div>

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
                                    onAdd={handleAddNote}
                                />

                                {notes.length ? (
                                    [...notes]
                                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                                        .map(n => <NoteItem key={n.id}
                                                            note={n}
                                                            statuses={statuses}
                                                            onDelete={() => handleDeleteNote(n.id)}
                                        />)
                                ) : (
                                    <p className="text-gray-400">No notes yet</p>
                                )}
                            </div>
                        </section>

                        <section className="bg-gray-100 p-4 rounded-xl shadow-inner flex flex-col">
                            <h3 className="font-semibold mb-2">Todos</h3>
                            <div className="overflow-y-auto max-h-[45vh] scrollbar-thin pr-2">
                                <NewTodoItem onAdd={handleAddTodo}/>

                                {todos.length ?
                                    todos
                                        .slice()
                                        .sort((a, b) => {
                                            const dateA = a.deadline ? new Date(a.deadline) : new Date(0);
                                            const dateB = b.deadline ? new Date(b.deadline) : new Date(0);

                                            if (dateA - dateB !== 0) return dateA - dateB;
                                            return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
                                        })
                                        .map(t => <TodoItem key={t.id}
                                                            todo={t}
                                                            onDelete={() => handleDeleteTodo(t.id)}
                                        />)
                                    : (
                                        <p className="text-gray-400">No todos yet</p>
                                    )}
                            </div>
                        </section>
                    </div>
                </div>
            </motion.div>
        </motion.div>
        <ConfirmDeleteModal
            open={showDeleteConfirm}
            title="Delete offer"
            description={`Are you sure you want to delete "${offer.position}" at ${offer.companyName}? This action cannot be undone.`}
            onCancel={() => setShowDeleteConfirm(false)}
            onConfirm={handleDeleteOffer}
        />
    </AnimatePresence>);
}
