import React, { useState, useEffect } from 'react';
import { Item } from '../types';
import Table from '../Components/Table';
import ModalComponent from '../Components/EditComponent';
import TextInputForm from '../Components/TextInputForm';
import axios from 'axios';
import { Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const Crud: React.FC = () => {
  const [sampleData, setSampleData] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [isTextInputFormOpen, setTextInputFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cors = require('cors');

  
  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7163/api/Todo');
      setSampleData(response.data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleEdit = (row: Item) => {
    setSelectedItem(row);
    setEditPopupOpen(true);
  };



  const handleEditPopupClose = () => {
    setEditPopupOpen(false);
    
  };

  const handleSaveEdit = () => {

    setSampleData((prevData: Item[]) =>
      prevData.map((item) => (item.id === selectedItem?.id ? selectedItem : item))
    );
    handleEditPopupClose();
  };

  const handleDelete = (row: Item) => {
 

      setSampleData((prevData: Item[]) => prevData.filter((item) => item.id !== row.id));
    
  };

  const handleOpenTextInputForm = () => {
    setTextInputFormOpen(true);
  };

  const handleCloseTextInputForm = () => {
    setTextInputFormOpen(false);
  };

  const handleTextInputFormSubmit = (input1: string, input2: string) => {
    
    setIsModalOpen(true);
    console.log('TextInputForm submitted:', input1, input2);
    handleCloseTextInputForm();
  };


  
  return (
    <div>
      <h2>Todo List</h2>
      <TextInputForm onSubmit={handleTextInputFormSubmit} />
     
      <Table data={sampleData} onEdit={handleEdit} onDelete={handleDelete} />

   
      <ModalComponent
        open={isEditPopupOpen}
        title="Edit Item"
        onClose={handleEditPopupClose}
        onSave={handleSaveEdit}
        itemId={selectedItem?.id || 0}
      />

   

   
       

    </div>
  );
};

export default Crud;
