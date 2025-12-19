import axios from "axios";

import offers from "../mocks/offers.json";

export const getOffers = (userId) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(offers.filter(o => o.userId === userId));
        }, 1);
    });

export const getOfferStatuses = (userId, offerId) =>
    axios.get(`${API_BASE}/${userId}/offers/${offerId}/statuses`).then(res => res.data);

export const getOfferNotes = (userId, offerId) =>
    axios.get(`${API_BASE}/${userId}/offers/${offerId}/notes`).then(res => res.data);

export const getOfferTodos = (userId, offerId) =>
    axios.get(`${API_BASE}/${userId}/offers/${offerId}/todos`).then(res => res.data);
