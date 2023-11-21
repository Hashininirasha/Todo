import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import './EditComponentStyles.scss';

interface ModalComponentProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSave: (editId: number | undefined, edittitle: string, editDescription: string, status: string) => void;

  itemId: number; 
  children?: React.ReactNode;

}

const ModalComponent: React.FC<ModalComponentProps> = ({ open, title, onClose, onSave, itemId, children, }) => {
  const [edittitle, setedittitle] = useState<string>('');
  const [editDescription, seteditDescription] = useState<string>('');
  const [editId, seteditId] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<string>(''); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7163/api/Todo/view/${itemId}`);
        const { id, title, description, status } = response.data; 
        seteditId(id);
        setedittitle(title);
        seteditDescription(description);
   
        setStatus(status);
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, itemId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    if (name === 'edittitle') {
      setedittitle(value);
    } else if (name === 'editDescription') {
      seteditDescription(value);
    } else if (name === 'editId') {
  
      const idValue = parseInt(value, 10); 
 
      if (!isNaN(idValue)) {
        seteditId(idValue);
      }
    }
  };
  
  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value as string;
    console.log('New Status:', newStatus);
    setStatus(newStatus);
  };
  
  

  const handleSave = async () => {

    const isConfirmed = window.confirm('Are you sure you want to save the changes?');
    
    if (!isConfirmed) {
      return;
    }
    console.log('Request Payload:', {
      id: editId,
      title: edittitle,
      description: editDescription,
      status: status,
   
    });
    try {

      await axios.put(`https://localhost:7163/api/Todo/update/${itemId}`, {
        id: editId,
        title: edittitle,
        description: editDescription,
        status: status,
      
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    
      onSave(editId, edittitle, editDescription, status);
      onClose();
    } catch (error) {
      console.error('Error updating item:', error);
  
    }
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
          required
        />
        <TextField
          label="Description"
          type="text"
          name="editDescription"
          value={editDescription}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
   
        <Select
          value={status}
          onChange={handleStatusChange}
          displayEmpty
          fullWidth
          className="select-container"
          required
        >
          <MenuItem value="" disabled>
            Select Status
          </MenuItem>
          <MenuItem value={1}>High priority</MenuItem>
          <MenuItem value={2}>Low priority</MenuItem>
          <MenuItem value={0}>Completed</MenuItem>
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
