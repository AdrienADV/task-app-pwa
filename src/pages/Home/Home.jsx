import React, { useEffect, useState } from 'react';
import '../Home/HomeStyle.css';

import CustomButton from '../../components/content/CustomButton';
import TextInputCustom from '../../components/content/TextInputCustom';
import Task from '../../components/content/Task';
import { Snackbar } from '@mui/material';

import { colors } from '../../Colors';

import { useLiveQuery } from 'dexie-react-hooks';
import { addTask, db, taskCompletedToggle } from '../../services/db';

const Home = () => {
  const [value, setValue] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [contentSnackBar, setContentSnackBar] = useState({});
  const tasks = useLiveQuery(() => db.tasks.toArray());

  const handleAddTask = async (label) => {
    const response = await addTask(label);
    if (response) {
      setValue('');
      setOpenSnackbar(true);
      setContentSnackBar({
        message: response.message,
        color: response.result ? colors.DARK_BLUE : colors.RED_LIGHT,
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <div className='header'>
        <div>
          <h1 style={{ fontWeight: 'bold', fontSize: 27 }}>Today's Task</h1>
          <p style={{ color: colors.LIGHT_GREY, marginTop: 10 }}>(2/4) Completed Tasks</p>
        </div>
        <p className='remove-task'>CLEAR ALL</p>
      </div>
      <div
        style={{
          width: '400px',
          height: '100%',
          padding: '0 20px',
          overflow: 'scroll',
        }}
      >
        {tasks &&
          tasks.map((task, index) => {
            console.log(task);
            return (
              <Task
                onClickCompletedtask={() =>
                  taskCompletedToggle(task.id, !task.isCompleted ? true : false)
                }
                key={index}
                label={task.label}
                isCompleted={task.isCompleted}
              />
            );
          })}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        message={contentSnackBar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: {
            backgroundColor: 'transparent',
            color: contentSnackBar.color,
            boxShadow: 'none',
            position: 'absolute',
            bottom: '60px',
            alignSelf: 'center',
          },
        }}
      />
      <div className='bottom-input'>
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
