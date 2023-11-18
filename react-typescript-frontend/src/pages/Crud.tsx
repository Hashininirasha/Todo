import React, { useState } from 'react';
import { Item } from '../types';
import Table from '../Components/Table';
import ModalComponent from '../Components/EditComponent';
import TextInputForm from '../Components/TextInputForm';

const Crud: React.FC = () => {
  const [sampleData, setSampleData] = useState<Item[]>([
    { id: 1, title: 'Task 1', description: 'Description 1', isActive: 1 },
    { id: 2, title: 'Task 2', description: 'Description 2', isActive: 1 },
   
  ]);

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [isTextInputFormOpen, setTextInputFormOpen] = useState(false);

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
    if (window.confirm('Are you sure to delete this Item')) {

      setSampleData((prevData: Item[]) => prevData.filter((item) => item.id !== row.id));
    }
  };

  const handleOpenTextInputForm = () => {
    setTextInputFormOpen(true);
  };

  const handleCloseTextInputForm = () => {
    setTextInputFormOpen(false);
  };

  const handleTextInputFormSubmit = (input1: string, input2: string) => {

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
>

</ModalComponent>
   

   
       

    </div>
  );
};

export default Crud;
