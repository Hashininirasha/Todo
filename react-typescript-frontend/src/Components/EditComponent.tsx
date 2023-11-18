import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface ModalComponentProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSave: (edittitle: string, editDecription: string, isComplete: boolean) => void;
  children?: React.ReactNode; 
}

const ModalComponent: React.FC<ModalComponentProps> = ({ open, title, onClose, onSave, children }) => {
  const [edittitle, setedittitle] = useState<string>('');
  const [editDecription, seteditDecription] = useState<string>('');
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'edittitle') {
      setedittitle(value);
    } else if (name === 'editDecription') {
      seteditDecription(value);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsComplete(event.target.checked);
  };

  const handleSave = () => {
    onSave(edittitle, editDecription, isComplete);

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
          label="Decription"
          type="text"
          name="editDecription"
          value={editDecription}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={<Checkbox checked={isComplete} onChange={handleCheckboxChange} />}
          label="Mark as Complete"
        />
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
