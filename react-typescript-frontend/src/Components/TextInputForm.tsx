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

    const url = 'https://localhost:7163/api/Todo';
    const payload = {
      "title": title,
      "description": description,
      "status": 0
    };

    try {
      const result = await axios.post(url, payload);
      console.log('Task added successfully:', result.data);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form className="text-input-form-container" onSubmit={handleSubmit}>
      <TextField
        label="Enter title"
        type="text"
        name="title"
        value={title}
        onChange={handleInputChange}
        className="text-input-title"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Enter description"
        type="text"
        name="description"
        value={description}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        className="text-input-Dec"
      />

<FormControl fullWidth margin="normal" className={`text-input-status`}>
        <InputLabel id="progress-label">Task Progress</InputLabel>
        <Select
          labelId="progress-label"
          id="progress"
          name="progress"
          value={progress}
          onChange={handleProgressChange}
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
