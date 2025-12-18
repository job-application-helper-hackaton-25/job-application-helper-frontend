import axios from "axios";

const API_BASE = "https://your-api.com/users";

export const getOffers = (userId) =>
    axios.get(`${API_BASE}/${userId}/offers`).then(res => res.data);

export const getOfferDetails = (userId, offerId) =>
    axios.get(`${API_BASE}/${userId}/offers/${offerId}`).then(res => res.data);

export const getOfferStatuses = (userId, offerId) =>
    axios.get(`${API_BASE}/${userId}/offers/${offerId}/statuses`).then(res => res.data);

export const getOfferNotes = (userId, offerId) =>
    axios.get(`${API_BASE}/${userId}/offers/${offerId}/notes`).then(res => res.data);

export const getOfferTodos = (userId, offerId) =>
    axios.get(`${API_BASE}/${userId}/offers/${offerId}/todos`).then(res => res.data);
