import axios from "axios";

import offers from "../mocks/offers.json";
import todosOffer1 from "../mocks/todos/todos-offer-1.json";
import todosOffer2 from "../mocks/todos/todos-offer-2.json";
import notesOffer1 from "../mocks/notes/notes-offer-1.json";
import notesOffer2 from "../mocks/notes/notes-offer-2.json";

const API_BASE = "https://your-api.com/users";

const TODOS_BY_OFFER = {
    "1": todosOffer1,
    "2": todosOffer2,
};
const NOTES_BY_OFFER = {
    "1": notesOffer1,
    "2": notesOffer2,
};

export const getOffers = (userId) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(offers.filter(o => o.userId === userId));
        }, 1);
    });

export const getOfferStatuses = (userId, offerId) =>
    axios.get(`${API_BASE}/${userId}/offers/${offerId}/statuses`).then(res => res.data);

export const getOfferNotes = (userId, offerId) =>
    new Promise((resolve) => {
        setTimeout(() => {
            const notes = NOTES_BY_OFFER[offerId] || [];
            resolve(notes.filter(t => t.userId === userId));
        }, 1);
    });

export const getOfferTodos = (userId, offerId) =>
    new Promise((resolve) => {
        setTimeout(() => {
            const todos = TODOS_BY_OFFER[offerId] || [];
            resolve(todos.filter(t => t.userId === userId));
        }, 1);
    });