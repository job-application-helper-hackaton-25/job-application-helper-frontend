import axios from "axios";

const API_BASE = "http://0.0.0.0:8080/offers";

export const getOfferNotes = (offerId) =>
    axios.get(`${API_BASE}/${offerId}/notes`).then(res => {
        return res.data;
    });

export const deleteOfferNote = (offerId, noteId) =>
    axios.delete(`${API_BASE}/${offerId}/notes/${noteId}`).then(res => {
        return res.data;
    });

export const createOfferNote = (offerId, note) =>
    axios.post(`${API_BASE}/${offerId}/notes`, {
        userId: note.userId,
        offerId: note.offerId,
        stage: note.stage,
        content: note.content,
        date: note.date,
    }).then(res => res.data);