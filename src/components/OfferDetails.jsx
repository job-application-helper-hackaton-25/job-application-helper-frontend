import React, { useEffect, useState } from "react";
import { getOfferDetails, getOfferStatuses, getOfferNotes, getOfferTodos } from "../api/offersApi-real";
import TodoItem from "./TodoItem";

export default function OfferDetails({ userId, offerId, onClose }) {
    const [offer, setOffer] = useState(null);
    const [statuses, setStatuses] = useState([]);
    const [notes, setNotes] = useState([]);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getOfferDetails(userId, offerId).then(setOffer);
        getOfferStatuses(userId, offerId).then(setStatuses);
        getOfferNotes(userId, offerId).then(setNotes);
        getOfferTodos(userId, offerId).then(setTodos);
    }, [userId, offerId]);

    if (!offer) return <div>Loading...</div>;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl overflow-auto max-h-[90vh]">
                <button onClick={onClose} className="mb-4 text-red-500">Close</button>
                <h2 className="text-xl font-bold">{offer.jobTitle} @ {offer.companyId}</h2>
                <p>Job Board: <a href={offer.jobBoardUrl} className="text-blue-500">{offer.jobBoard}</a></p>
                <p>Status: {offer.status} | Priority: {offer.priority}</p>
                <p>Salary: Expected {offer.salary.expected}, Offered {offer.salary.offered}</p>

                <h3 className="mt-4 font-semibold">Statuses</h3>
                {statuses.map(s => (
                    <p key={s.id}>{s.date}: {s.status}</p>
                ))}

                <h3 className="mt-4 font-semibold">Notes</h3>
                {notes.map(n => (
                    <p key={n.id}>{n.date} ({n.stage}): {n.content}</p>
                ))}

                <h3 className="mt-4 font-semibold">Todos</h3>
                {todos.map(t => <TodoItem key={t.id} todo={t} />)}
            </div>
        </div>
    );
}
