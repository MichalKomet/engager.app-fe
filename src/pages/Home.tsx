import { useEffect, useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import TodoList from '../components/TodoList';
import TodoDialog from '../components/TodoDialog';
import { Todo } from '../types';

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);
    const [filter, setFilter] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, [dialogOpen]);

    const fetchTodos = async () => {
        try {
            const data = await getAllTodos();
            setTodos(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (todo: Todo) => {
        setEditingTodo(todo);
        setDialogOpen(true);
    };

    const handleOpenNew = () => {
        setEditingTodo(undefined);
        setDialogOpen(true);
    };

    const filteredTodos = filter ?
        todos
        : todos.filter(todo =>
            todo.completionDate === null ||
            todo.completionDate && new Date(todo.completionDate).getTime() > Date.now()
        );

    const handleSave = async (data: Partial<Todo>) => {
        try {
            if (editingTodo) {
                const updated = await updateTodo(editingTodo.id, data);
                setTodos((prev) =>
                    prev.map((t) => (t.id === editingTodo.id ? updated : t))
                );
            } else {
                const newTodo = await createTodo(data);
                setTodos((prev) => [...prev, newTodo]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container sx={{mt: 4}}>
            <Typography variant="h4" gutterBottom>
                My Great TODO List
            </Typography>

            <Button variant="contained" onClick={handleOpenNew} sx={{mb: 2}}>
                Add New
            </Button>

            <label>
                <input
                    type="checkbox"
                    checked={filter}
                    onChange={e => setFilter(e.target.checked)}
                />
                Show completed Todos
            </label>

            <TodoList
                todos={filteredTodos}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <TodoDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSave={handleSave}
                editingTodo={editingTodo}
            />
        </Container>
    );
}