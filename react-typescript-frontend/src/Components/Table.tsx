import React from 'react';
import './TableStyles.scss';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TableProps {
  data: any[];
  onEdit: (row: any) => void; 
  onDelete: (row: any) => void; 
}

const Table: React.FC<TableProps> = ({ data, onEdit, onDelete }) => {
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.title}</td>
              <td>{row.description}</td>
              <td>{row.isActive ? 'Completed' : 'Not Completed'}</td>
              <td>
            <Button onClick={() => onEdit(row)} startIcon={<EditIcon className="custom-icon-color" />}>
 
            </Button>     

            <Button onClick={() => onDelete(row)} startIcon={<DeleteIcon className="custom-icon-color" />}>

    </Button>     

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
