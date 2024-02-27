import React, { useEffect, useState } from 'react';
import '../Home/HomeStyle.css';

import CustomButton from '../../components/content/CustomButton';
import TextInputCustom from '../../components/content/TextInputCustom';
import Task from '../../components/content/Task';

import { colors } from '../../Colors';

import { useLiveQuery } from 'dexie-react-hooks';
import { addTask, db } from '../../services/db';

const Home = () => {
  const [value, setValue] = useState('');
  // const tasks = useLiveQuery(() => db.tasks.toArray(), []);
  const handleAddTask = (value) => {
    addTask(value);
  };
  useEffect(() => {
    handleAddTask('manger des nems');
  }, []);

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
        <Task content='Faire les courses' isCompleted={false} />
        <Task content='Faire les courses' isCompleted={false} />
      </div>
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
        />
      </div>
    </div>
  );
};

export default Home;
