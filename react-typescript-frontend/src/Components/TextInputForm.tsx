import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import './TextInputFormStyles.scss';

interface TextInputFormProps {
  onSubmit: (title: string, description: string) => void;
}

const TextInputForm: React.FC<TextInputFormProps> = ({ onSubmit }) => {
  const [title, settitle] = useState<string>('');
  const [description, setdescription] = useState<string>('');

  const inputStyle = {
    width: '300px',
    marginRight: '100px',
    marginLeft: '120px',
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'title') {
      settitle(value);
    } else if (name === 'description') {
      setdescription(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(title, description);
  };

  return (
    <form className="text-input-form-container" onSubmit={handleSubmit}>
      <TextField
        label="Enter title"
        type="text"
        name="title"
        value={title}
        onChange={handleInputChange}
        className="text-input"
        fullWidth
        margin="normal"
        style={inputStyle}
      />
      <TextField
        label="Enter description"
        type="text"
        name="description"
        value={description}
        onChange={handleInputChange}
        className="text-input"
        fullWidth
        margin="normal"
        style={inputStyle}
      />
      <Button type="submit" variant="contained" color="primary" className="submit-button">
        Submit
      </Button>
    </form>
  );
};

export default TextInputForm;
