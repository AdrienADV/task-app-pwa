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
import noTaskImage from '../../../src/assets/visuel/no_tasks.png';
import ModalTaskDetails from '../../components/content/ModalTaskDetails';

const Home = () => {
  const [value, setValue] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [contentSnackBar, setContentSnackBar] = useState({});
  const [optionTextInput, setOptionTextInpu] = useState(false);
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
      <div className='container-tasks' style={{ paddingBottom: tasks?.length >= 6 && '200px' }}>
        {tasks?.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <img src={noTaskImage} alt='No tasks available' style={{ maxWidth: '300px' }} />
            <p style={{ color: colors.LIGHT_GREY, marginTop: 20 }}>No tasks available</p>
          </div>
        ) : (
          tasks
            ?.sort((a, b) => b.status - a.status)
            .map((task, index) => (
              <Task
                onClickCompleted={() => taskCompletedToggle(task.id, !task.isCompleted)}
                key={index}
                label={task.label}
                isCompleted={task.isCompleted}
                onDeleted={() => handleRemoveTask(task.id)}
                status={task.status}
                onClickStatus={(status) => handleStatusChange(status, task.id)}
              />
            ))
        )}
      </div>
      {optionTextInput && <ModalTaskDetails />}
      <div style={{ backgroundColor: '#FFFFFF' }} className='bottom-input'>
        {openSnackbar && (
          <p className='snackbar-animation' style={{ color: contentSnackBar.color }}>
            {contentSnackBar?.message}
          </p>
        )}
        <TextInputCustom
          value={value}
          onChangeText={setValue}
          placeholder='Add task lazy men'
          removeText={true}
          removeTextOnClick={() => setValue('')}
          isOptionAvailableOnClick={() => setOptionTextInpu(!optionTextInput)}
          onEnterPress={() => {
            handleAddTask(value);
          }}
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
