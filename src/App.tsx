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

interface Task {
  id: string;
  title: string;
  isDeleted: boolean;
  isCompleted: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
   setTasks(data); 
  }, []);

  const activeTasks = useMemo(() => {
    return tasks.filter(task => !task.isDeleted);
  }, [tasks]);

  const totalCompleted = useMemo(() => {
    return activeTasks.filter(task => task.isCompleted).length;
  }, [activeTasks]);

  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleCreateTask = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTask.trim()) return;

    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: uuidv4(),
        title: newTask.trim(),
        isDeleted: false,
        isCompleted: false,
      },
    ]);
    setNewTask("");
  };

  const completeTask = useCallback((id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, isCompleted: true } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, isDeleted: true } : task
      )
    );
  }, []);

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <form className={styles.newText} onSubmit={handleCreateTask}>
          <input
            id="newTask"
            name="newTask" 
            type="text"
            placeholder="Adicione uma tarefa"
            value={newTask}
            onChange={handleNewTaskChange}
            required
          />
          <button 
            type="submit" 
            className={styles.newButton}
            disabled={!newTask.trim()}>
            <PlusCircle size={20} weight="bold"/>
            Adicionar
          </button>
        </form>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <div>
              <strong>Tarefas criadas</strong>
              <span>{activeTasks.length}</span>
            </div>

            <div>
              <strong>Concluídas</strong>
              <span>
                {totalCompleted} de {tasks.filter(task => !task.isDeleted).length}
              </span>
            </div>
          </div>
          <div className={styles.contentBox}>
            {activeTasks.length > 0 ? (
               activeTasks.map((task: Task) => (
                <Task
                  key={task.id}
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
