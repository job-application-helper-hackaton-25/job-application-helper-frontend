import axios from "axios";

const API_BASE = "http://0.0.0.0:8080/offers";

export const getOffers = () =>
    axios.get(`${API_BASE}`).then(res => {
        return res.data;
    });

export const deleteOffer = (offerId) =>
    axios.delete(`${API_BASE}/${offerId}`).then(res => {
        return res.data;
    });

export const getOffersStatuses = () =>
    axios.get(`${API_BASE}/statuses`).then(res => {
        return res.data;
    });

export const updateOfferStatuses = (offerId, status) =>
    axios.patch(`${API_BASE}/${offerId}`,  {
        status: status
    }).then(res => res.data);

export const getOfferDetails = (userId, offerId) =>
    axios.get(`${API_BASE}/${userId}/offers/${offerId}`).then(res => res.data);

export const getOfferStatuses = (userId, offerId) =>
    axios.get(`${API_BASE}/${userId}/offers/${offerId}/statuses`).then(res => res.data);

export const getOfferNotes = (userId, offerId) =>
    axios.get(`${API_BASE}/${userId}/offers/${offerId}/notes`).then(res => res.data);

export const getOfferTodos = (userId, offerId) =>
    axios.get(`${API_BASE}/${userId}/offers/${offerId}/todos`).then(res => res.data);
