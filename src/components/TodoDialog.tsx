import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Alert
} from '@mui/material';
import { Todo } from '../types';

interface Props {
    open: boolean,
    onClose: () => void,
    onSave: (data: Partial<Todo>) => Promise<void>,
    editingTodo?: Todo
}

export default function TodoDialog({ open, onClose, onSave, editingTodo }: Props) {
    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState<string | null>(null);
    const [completionDate, setCompletionDate] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;

        if (editingTodo) {
            setName(editingTodo.name || '');
            setDueDate(editingTodo.dueDate || null);
            setCompletionDate(editingTodo.completionDate || null);
        } else {
            setName('');
            setDueDate(null);
            setCompletionDate(null);
        }
        setErrorMessage(null);
    }, [open, editingTodo]);

    const handleSubmit = () => {
        setErrorMessage(null);

        onSave({ name, dueDate, completionDate })
            .then(() => onClose())
            .catch((error) => {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage('Something went wrong');
                }
            });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{editingTodo ? 'Edit TODO' : 'New TODO'}</DialogTitle>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Due Date"
                    type="date"
                    value={dueDate || ''}
                    onChange={(e) => setDueDate(e.target.value || null)}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Completion Date"
                    type="date"
                    value={completionDate || ''}
                    onChange={(e) => setCompletionDate(e.target.value || null)}
                    InputLabelProps={{ shrink: true }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}