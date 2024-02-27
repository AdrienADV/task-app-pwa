import React, { useState } from 'react';
import '../Home/HomeStyle.css';

import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/content/CustomButton';
import TextInputCustom from '../../components/content/TextInputCustom';
import Task from '../../components/content/Task';
import { colors } from '../../Colors';

const Home = () => {
  const [value, setValue] = useState('');

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
          height: '430px',
          padding: '0 20px',
          overflow: 'scroll',
        }}
      >
        <Task content='Faire les courses' isCompleted={false} />
        <Task content='Faire les courses' isCompleted={true} />
      </div>
      <div className='bottom-input'>
        <TextInputCustom value={value} onChangeText={setValue} placeholder='Ajouter une tache' />
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
