import axios from "axios";

const API_BASE = "http://0.0.0.0:8080/offers";

export const getOfferTodos = (offerId) =>
    axios.get(`${API_BASE}/${offerId}/todos`).then(res => {
        return res.data;
    });

export const createOfferTodo = (offerId, todo) =>
    axios.post(`${API_BASE}/${offerId}/todos`, {
        userId: todo.userId,
        offerId: todo.offerId,
        content: todo.content,
        deadline: todo.deadline,
        priority: todo.priority,
        completed: todo.completed,
    }).then(res => res.data);