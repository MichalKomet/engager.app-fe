import { Todo } from "../types.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getTodo = async (id: number): Promise<Todo> => {
    const res = await fetch(`${BASE_URL}/items/${id}`);
    if (!res.ok) throw new Error('Failed to fetch todo');
    return res.json();
};

export const getAllTodos = async (): Promise<Todo[]> => {
    const res = await fetch(`${BASE_URL}/items`);
    if (!res.ok) throw new Error('Failed to fetch todos');
    return res.json();
};

export const createTodo = async (data: Partial<Todo>): Promise<Todo> => {
    const res = await fetch(`${BASE_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create todo');
    return res.json();
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
    if (!res.ok) throw new Error('Failed to update todo');
    return res.json();
};

export const deleteTodo = async (id: number): Promise<{deletedId: number}> => {
    const res = await fetch(`${BASE_URL}/items/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete todo');
    return res.json();
};