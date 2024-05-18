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
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [location, setLocation] = useState({ latitude: null, longitude: null, error: null });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [contentSnackBar, setContentSnackBar] = useState({});
  const [optionTextInput, setOptionTextInpu] = useState(false);
  const [cityValue, setCityValue] = useState('Nantes');
  const [postalCodeValue, setPostalCodeValue] = useState('44100');
  const [addressValue, setAddressValue] = useState('43 rue de la ferme du rû');
  const [selectedOption, setSelectedOption] = useState(0);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocation({ ...location, error: 'Geolocation is not supported by your browser.' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          ...location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      () => {
        setLocation({ ...location, error: 'Unable to retrieve your location.' });
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const tasks = useLiveQuery(async () => {
    const allTasks = await db.tasks.toArray();

    const tasksWithDetails = await Promise.all(
      allTasks.map(async (task) => {
        const details = await db.taskDetails.where({ taskId: task.id }).first();
        return { ...task, details: details || undefined };
      })
    );

    return tasksWithDetails;
  });

  console.log(JSON.stringify(tasks, null, 2));

  const handleSelectOption = (id) => {
    setSelectedOption(id);
  };

  const detailsType = [
    { label: 'GPS', id: 1 },
    { label: 'Ajouter un fichier', id: 2 },
  ];

  const taskStats = useLiveQuery(async () => {
    const allTasks = await db.tasks.toArray();
    const completedTasks = allTasks.filter((task) => task.isCompleted);
    const completedCount = completedTasks.length;
    const totalCount = allTasks.length;
    return `${completedCount}/${totalCount}`;
  }, [tasks]);

  const handleAddTask = async (label, type, contentDetails, isOnline) => {
    const response = await addTask(label, type, contentDetails, isOnline);
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

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
                onClickCompletedTask={() => taskCompletedToggle(task.id, !task.isCompleted)}
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
      {optionTextInput && (
        <ModalTaskDetails
          detailsType={detailsType}
          selectedOption={handleSelectOption}
          options={selectedOption}
          cityValue={cityValue}
          postalCodeValue={postalCodeValue}
          addressValue={addressValue}
          setCityValue={setCityValue}
          setPostalCodeValue={setPostalCodeValue}
          setAddressValue={setAddressValue}
        />
      )}
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
          onClick={() =>
            handleAddTask(
              value,
              selectedOption,
              selectedOption === 1
                ? addressValue + ' ' + postalCodeValue + ' ' + cityValue
                : undefined,
              isOnline
            )
          }
        />
      </div>
    </div>
  );
};

export default Home;
