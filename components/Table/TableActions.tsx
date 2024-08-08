import Link from "next/link";
import React from "react";

interface TableActionsProps {
  id: string;
  handleDelete: (id: string) => void;
  editLink: string;

  handleView: (id: string) => void;
}

export const TableActions: React.FC<TableActionsProps> = ({
  id,
  handleDelete,
  handleView,
  editLink,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => {
          handleDelete(id);
        }}
      >
        <i className="fas fa-trash"></i>
      </button>

      <Link href={editLink}>
        <button className="text-blue-500 hover:text-blue-700">
          <i className="fas fa-edit"></i>
        </button>
      </Link>
      <button
        className="text-green-500 hover:text-green-700"
        onClick={() => handleView(id)}
      >
        <i className="fas fa-eye"></i>
      </button>
    </div>
  );
};

export default TableActions;
