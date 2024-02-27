import React, { useState } from 'react';
import '../Home/HomeStyle.css';

import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/content/CustomButton';
import TextInputCustom from '../../components/content/TextInputCustom';
import Task from '../../components/content/Task';

const Home = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  return (
    <div>
      <Task isCompleted={false} content={'Acheter du pain'} />
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
