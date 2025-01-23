import { Todo } from "../types.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getTodo = async (id: number): Promise<Todo> => {
    const res = await fetch(`${BASE_URL}/items/${id}`);
    const resText = await res.json();

    if (!resText.success) throw new Error('Failed to fetch todo');

    return resText;
};

export const getAllTodos = async (): Promise<Todo[]> => {
    const res = await fetch(`${BASE_URL}/items`);
    const resText = await res.json();

    if (!resText.success) throw new Error('Failed to fetch todos');

    return resText;
};

export const createTodo = async (data: Partial<Todo>): Promise<Todo> => {
    const res = await fetch(`${BASE_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const resText = await res.json();

    if (!resText.success) {
        throw new Error(
            resText.errors[0].msg ||
            resText.message ||
            'Failed to create todo'
        )
    }

    return resText;
};

export const updateTodo = async (
    id: number,
    data: Partial<Todo>
) => {
    const res = await fetch(`${BASE_URL}/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const resText = await res.json();

    if (!resText.success) {
        throw new Error(
            resText.errors[0].msg ||
            resText.message ||
            'Failed to update todo'
        )
    }

    return resText;
};

export const deleteTodo = async (id: number): Promise<{deletedId: number}> => {
    const res = await fetch(`${BASE_URL}/items/${id}`, {
        method: 'DELETE',
    });
    const resText = await res.json();

    if (!resText.success) throw new Error('Failed to delete todo');

    return resText;
};