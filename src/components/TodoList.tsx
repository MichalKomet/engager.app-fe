import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Todo } from '../types';

interface Props {
    todos: Todo[];
    onEdit: (todo: Todo) => void;
    onDelete: (id: number) => void;
}

export default function TodoList({ todos, onEdit, onDelete }: Props) {
    return (
        <List>
            {todos.map((todo) => (
                <ListItem
                    key={todo.id}
                    secondaryAction={
                        <>
                            <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => onEdit(todo)}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => onDelete(todo.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }
                >
                    <ListItemText
                        primary={todo.name}
                        secondary={`Due: ${todo.dueDate || '-'} | Completed: ${todo.completionDate || '-'}`}
                    />
                </ListItem>
            ))}
        </List>
    );
}