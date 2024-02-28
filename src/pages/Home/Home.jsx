import React, { useEffect, useState } from 'react';
import '../Home/HomeStyle.css';

import CustomButton from '../../components/content/CustomButton';
import TextInputCustom from '../../components/content/TextInputCustom';
import Task from '../../components/content/Task/Task';

import { colors } from '../../Colors';

import { useLiveQuery } from 'dexie-react-hooks';
import {
  addTask,
  db,
  removeTask,
  taskCompletedToggle,
  deleteAllTasks,
  changeTaskStatus,
} from '../../services/db';

const Home = () => {
  const [value, setValue] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [contentSnackBar, setContentSnackBar] = useState({});
  const tasks = useLiveQuery(() => db.tasks.toArray());

  const taskStats = useLiveQuery(async () => {
    const allTasks = await db.tasks.toArray();
    const completedTasks = allTasks.filter((task) => task.isCompleted);
    const completedCount = completedTasks.length;
    const totalCount = allTasks.length;
    return `${completedCount}/${totalCount}`;
  }, [tasks]);

  const handleAddTask = async (label) => {
    const response = await addTask(label);
    if (response) {
      setValue('');
      setContentSnackBar({
        message: response.message,
        color: response.result ? colors.DARK_BLUE : colors.RED_LIGHT,
      });
      setOpenSnackbar(true);
    }
  };

  const handleRemoveTask = async (id) => {
    const response = id ? await removeTask(id) : await deleteAllTasks();
    if (response) {
      setContentSnackBar({
        message: response,
        color: colors.DARK_BLUE,
      });
      setOpenSnackbar(true);
    }
  };

  const handleStatusChange = async (newStatus, taskId) => {
    const response = await changeTaskStatus(newStatus, taskId);
    if (response) {
      setContentSnackBar({
        message: response.message,
        color: response.result ? colors.DARK_BLUE : colors.RED_LIGHT,
      });
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    if (openSnackbar) {
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 1000);
    }
    return;
  }, [openSnackbar]);

  return (
    <div>
      <div className='header'>
        <div>
          <h1 style={{ fontWeight: 'bold', fontSize: 27 }}>Today's Task</h1>
          <p style={{ color: colors.LIGHT_GREY, marginTop: 10 }}>{taskStats} Completed Tasks</p>
        </div>
        <p onClick={() => handleRemoveTask()} className='remove-task'>
          CLEAR ALL
        </p>
      </div>
      <div className='container-tasks'>
        {tasks
          ?.sort((a, b) => b.status - a.status)
          .map((task, index) => {
            return (
              <Task
                onClickCompletedtask={() =>
                  taskCompletedToggle(task.id, !task.isCompleted ? true : false)
                }
                key={index}
                label={task.label}
                isCompleted={task.isCompleted}
                onDeleted={() => handleRemoveTask(task.id)}
                status={task.status}
                onClickStatus={(status) => handleStatusChange(status, task.id)}
              />
            );
          })}
      </div>
      <div style={{ backgroundColor: '#FFFFFF' }} className='bottom-input'>
        {openSnackbar && (
          <p className='snackbar-animation' style={{ color: contentSnackBar.color }}>
            {contentSnackBar?.message}
          </p>
        )}
        <TextInputCustom
          value={value}
          onChangeText={setValue}
          placeholder='Ajouter une tache'
          removeText={true}
          removeTextOnClick={() => setValue('')}
        />
        <CustomButton
          containerStyle={{ marginTop: 20 }}
          label='ADD TASK'
          disabled={value.length <= 0}
          onClick={() => handleAddTask(value)}
        />
      </div>
    </div>
  );
};

export default Home;
