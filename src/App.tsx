import { PlusCircle, ClipboardText } from "phosphor-react";
import { useCallback, useMemo, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./app.module.css";
import { Header } from "./components/Header";
import { Task } from "./components/Task";

const data = [
  {
    id: uuidv4(),
    title: "Tarefa 1",
    isDeleted: false,
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Tarefa 2",
    isDeleted: false,
    isCompleted: false,
  },
];

export function App() {
  const [tasks, setTasks] = useState<any>();
  const [newTask, setNewTask] = useState("");
  const [totalCompleted, setTotalCompleted] = useState(0)

  useEffect(() => {
   setTasks(data) 
  })

  const handleNewTaskChange = (event: any) => {
    event.preventDefault();
    setNewTask(event.target.value);
  };

  const handleCreateTask = (event: any) => {
    event.preventDefault();

    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        title: newTask,
        isDeleted: false,
        isCompleted: false,
      },
    ]);
    setNewTask("");
  };

  const completeTask = (id: string) => {
    const tasksWithoutCompleteOne = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: true } : task
    );

    setTasks(tasksWithoutCompleteOne);
  };

  const deleteTask = (id: string) => {
    const taskssWithoutDeleteOne = tasks.filter((task) => task.id !== id);

    setTasks(taskssWithoutDeleteOne);
  };

  useEffect(() => {
    tasks.map((task) => task.isCompleted === true && setTotalCompleted(totalCompleted + 1));
  }, [totalCompleted])

  

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <form className={styles.newText} onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Adicione uma tarefa"
            value={newTask}
            onChange={handleNewTaskChange}
            required
          />
          <button type="submit">
            Criar
            <PlusCircle size={20} />
          </button>
        </form>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <div>
              <strong>Tarefas criadas</strong>
              <span>{tasks.length}</span>
            </div>

            <div>
              <strong>Concluídas</strong>
              <span>
                {totalCompleted} de {tasks.length}
              </span>
            </div>
          </div>
          <div className={styles.contentBox}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Task
                  id={task.id}
                  checked={task.isCompleted}
                  title={task.title}
                  onComplete={completeTask}
                  onDelete={deleteTask}
                />
              ))
            ) : (
              <>
                <ClipboardText size={56} />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <small>Crie tarefas e organize seus itens a fazer</small>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
