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
import { useSelector } from 'react-redux';
import Onboarding from '../../components/content/Onboarding';

const Home = () => {
  const store = useSelector((state) => state.user);
  const [value, setValue] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [contentSnackBar, setContentSnackBar] = useState({});
  const [optionTextInput, setOptionTextInput] = useState(false);
  const [cityValue, setCityValue] = useState('Nantes');
  const [postalCodeValue, setPostalCodeValue] = useState('44100');
  const [addressValue, setAddressValue] = useState('43 rue de la ferme du rû');
  const [selectedOption, setSelectedOption] = useState(0);
  const [file, setFile] = useState(null);

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

  const speechHandler = () => {
    const eachTask = tasks.map((task) => task.label).join(', ');
    const speechText = `tes prochaines taches sont: ${eachTask}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    window.speechSynthesis.speak(utterance);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleAddTask = async (label, type, contentDetails) => {
    const response = await addTask(label, type, contentDetails);
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

  const handleDownloadFile = (contentDetails) => {
    const pdfLink = `${contentDetails}`;
    const anchorElement = document.createElement('a');
    const fileName = `document.pdf`;
    anchorElement.href = pdfLink;
    anchorElement.download = fileName;
    anchorElement.click();
  };

  if (!store.isCompleted) {
    return <Onboarding />;
  }

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
            .map((task) => (
              <Task
                detailsContent={task.details?.content}
                type={task.type}
                onClickCompletedTask={() => taskCompletedToggle(task.id, !task.isCompleted)}
                key={task.id}
                label={task.label}
                isCompleted={task.isCompleted}
                onDeleted={() => handleRemoveTask(task.id)}
                status={task.status}
                onClickStatus={(status) => handleStatusChange(status, task.id)}
                onClickOpenFile={(contentDetails) => {
                  handleDownloadFile(contentDetails);
                }}
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
          handleFileChange={handleFileChange}
          showLottie={file}
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
          textToSpeechClick={() => speechHandler()}
          onChangeText={setValue}
          placeholder='Add task lazy men'
          removeText={true}
          removeTextOnClick={() => setValue('')}
          isOptionAvailableOnClick={() => setOptionTextInput(!optionTextInput)}
          onEnterPress={() => {
            handleAddTask(
              value,
              selectedOption,
              selectedOption === 1 ? addressValue + ' ' + postalCodeValue + ' ' + cityValue : file
            );
            setFile(null);
            setSelectedOption(0);
            setOptionTextInput(false);
          }}
        />
        <CustomButton
          containerStyle={{ marginTop: 20 }}
          label='ADD TASK'
          disabled={value.length <= 0}
          onClick={() => {
            handleAddTask(
              value,
              selectedOption,
              selectedOption === 1 ? addressValue + ' ' + postalCodeValue + ' ' + cityValue : file
            );
            setFile(null);
            setSelectedOption(0);
            setOptionTextInput(false);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
