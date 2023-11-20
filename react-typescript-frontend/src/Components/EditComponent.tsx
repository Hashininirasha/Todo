import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material';
import "./EditComponentStyles.scss"

interface ModalComponentProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSave: (edittitle: string, editDescription: string, isComplete: boolean, status: string) => void;
  children?: React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ open, title, onClose, onSave, children }) => {
  const [edittitle, setedittitle] = useState<string>('');
  const [editDescription, seteditDescription] = useState<string>('');
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(''); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'edittitle') {
      setedittitle(value);
    } else if (name === 'editDescription') {
      seteditDescription(value);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsComplete(event.target.checked);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const handleSave = () => {
    onSave(edittitle, editDescription, isComplete, status);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          type="text"
          name="edittitle"
          value={edittitle}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          type="text"
          name="editDescription"
          value={editDescription}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
   
        <Select
          value={status}
          onChange={handleStatusChange}
          displayEmpty
          fullWidth
          className="select-container"
        
        >
          <MenuItem value="" disabled>
            Select Status
          </MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
      {children}
    </Dialog>
  );
};

export default ModalComponent;
