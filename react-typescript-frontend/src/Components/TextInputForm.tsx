import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './TextInputFormStyles.scss';
import { SelectChangeEvent } from '@mui/material';
import axios from 'axios';

interface TextInputFormProps {
  onSubmit: (title: string, description: string, progress: number) => void;
}

const TextInputForm: React.FC<TextInputFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const handleProgressChange = (event: SelectChangeEvent<number>) => {
    setProgress(event.target.value as number);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(title, description, progress);

    const url = 'https://localhost:7163/api/Todo/create';
    const payload = {
      "title": title,
      "description": description,
      "status": progress,
    };
    try {
      const result = await axios.post(url, payload);
      console.log('Task added successfully:', result.data);
      alert('Successfully added');
    
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <form className="text-input-form-container" onSubmit={handleSubmit}>
      <TextField
      id="filled-basic"
        label="Enter title"
        type="text"
        name="title"
        value={title}
        onChange={handleInputChange}
        className="text-input-title"
        fullWidth
        margin="normal"
        required
        variant="filled"
      />
      <TextField
      id="filled-basic"
        label="Enter description"
        type="text"
        name="description"
        value={description}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        className="text-input-Dec"
        required
        variant="filled"
      />



<FormControl variant="filled" margin="normal" className={`text-input-status`}>
        <InputLabel id="demo-simple-select-filled-label">Task Progress</InputLabel>
        <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
          name="progress"
          // value={progress}
          onChange={handleProgressChange}
          required
        >
          <MenuItem value={1}>High priority</MenuItem>
          <MenuItem value={2}>Low priority</MenuItem>
          
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" className="submit-button">
        ADD
      </Button>
    </form>
  );
};

export default TextInputForm;
