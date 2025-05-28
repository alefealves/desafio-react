import { Trash } from "phosphor-react";
import styles from "./task.module.css";

interface TaskProps {
  id: string;
  checked: boolean;
  title: string;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function Task({ checked, title, id, onComplete, onDelete }: TaskProps) {
  const handleCompleteTask = () => {
    onComplete(id);
  };

  const handleDeleteTask = () => {
    onDelete(id);
  };

  return (
    <div className={styles.task}>
      <div>
        <input
          type="checkbox"
          id={`task-${id}`}
          name={`task-${id}`}
          checked={checked}
          onChange={handleCompleteTask}
        />
        <label htmlFor={`task-${id}`}>{title}</label>
      </div>
      <button type="button" onClick={handleDeleteTask}>
        <Trash size={24} />
      </button>
    </div>
  );
}
