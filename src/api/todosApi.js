import axios from "axios";

const API_BASE = "http://0.0.0.0:8080/offers";

export const getOfferTodos = (offerId) =>
    axios.get(`${API_BASE}/${offerId}/todos`).then(res => {
        return res.data;
    });

export const deleteOfferTodo = (offerId, todoId) =>
    axios.delete(`${API_BASE}/${offerId}/todos/${todoId}`).then(res => {
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

export const updateOfferTodo = (offerId, todoId, data) =>
    axios.patch(`${API_BASE}/${offerId}/todos/${todoId}`,  data,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.data);