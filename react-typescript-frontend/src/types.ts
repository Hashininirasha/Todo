export interface Item {
    id: number;
    title: string;
    description: string;
    status: number;
  }

  export interface ModalComponentProps {
    open: boolean;
    title: string;
    onClose: () => void;
    onSave: (editId: number | undefined, edittitle: string, editDescription: string, status: string) => void;
  
    itemId: number; 
    children?: React.ReactNode;
  
  }

  export interface TableProps {
    data: any[];
    onEdit: (row: any) => void; 
    onDelete: (row: any) => void; 
  }

  export interface TextInputFormProps {
    onSubmit: (title: string, description: string, progress: number) => void;
  }
  