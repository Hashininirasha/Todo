import React from 'react';
import './TableStyles.scss';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import {TableProps} from "../types"


const Table: React.FC<TableProps> = ({ data, onEdit, onDelete }) => {
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  const handleDelete = async (row: any) => {
    if (window.confirm('Are you sure to delete this item?')) {
      try {
 
        await axios.delete(`https://localhost:7163/api/Todo/delete/${row.id}`);
        

        onDelete(row);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };


  const columns = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
        {/* <th>ID</th> */}
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {/* <td>{row.id}</td> */}
            <td>{row.title}</td>
            <td>{row.description}</td>
            <td>
              {row.status === 0 ? 'Completed' :
               row.status === 1 ? 'High priority' :
               row.status === 2 ? 'Low priority' :
               'Unknown status'}
            </td>
            <td>
              <Button onClick={() => onEdit(row)} startIcon={<EditIcon className="custom-icon-color" />}>
              </Button>
              <Button onClick={() => handleDelete(row)} startIcon={<DeleteIcon className="custom-icon-color" />}>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
