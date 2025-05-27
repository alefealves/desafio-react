import { Trash } from "phosphor-react";
import styles from "./task.module.css";

export function Task({ checked, title, id, onComplete, onDelete }: any) {
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
          id="task"
          name="task"
          checked={checked}
          onClick={handleCompleteTask}
        />
        <label htmlFor="task">{title}</label>
      </div>
      <button type="button" onClick={handleDeleteTask}>
        <Trash size={24} />
      </button>
    </div>
  );
}
