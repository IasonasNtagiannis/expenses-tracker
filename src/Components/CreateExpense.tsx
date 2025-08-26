import { PlusCircle } from "lucide-react";
import { useState } from "react";
import type { Expense } from "../types";
import CreateExpenseForm from "./CreateExpenseForm";
import Modal from "./Modal";

interface CreateExpenseProps {
  addExpense: (expense: Expense) => void;
}

const CreateExpenseModal: React.FC<CreateExpenseProps> = ({ addExpense }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const closeCreateForm = () => {
    setShowCreateForm(false);
  };
  const openCreateForm = () => {
    setShowCreateForm(true);
  };
  return (
    <>
      <div className="p-4">
        <button
          onClick={openCreateForm}
          className="flex w-full gap-2 items-center justify-center bg-black text-white rounded-lg p-2"
        >
          <span>Create new</span>
          <PlusCircle size={24} />
        </button>
      </div>
      <Modal isOpen={showCreateForm} onClose={closeCreateForm}>
        <CreateExpenseForm onClose={closeCreateForm} addExpense={addExpense} />
      </Modal>
    </>
  );
};

export default CreateExpenseModal;
