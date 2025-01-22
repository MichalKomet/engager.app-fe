import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField
} from '@mui/material';
import { Todo } from '../types';

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (data: Partial<Todo>) => void;
    editingTodo?: Todo;
}

export default function TodoDialog({ open, onClose, onSave, editingTodo }: Props) {
    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState<string | null>(null);
    const [completionDate, setCompletionDate] = useState<string | null>(null);

    useEffect(() => {
        if (editingTodo) {
            setName(editingTodo.name || '');
            setDueDate(editingTodo.dueDate || null);
            setCompletionDate(editingTodo.completionDate || null);
        } else {
            setName('');
            setDueDate(null);
            setCompletionDate(null);
        }
    }, [editingTodo]);

    const handleSubmit = () => {
        onSave({ name, dueDate, completionDate });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{editingTodo ? 'Edit TODO' : 'New TODO'}</DialogTitle>
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
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value || null)}
                />
                <TextField
                    label="Completion Date"
                    type="date"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value || null)}
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