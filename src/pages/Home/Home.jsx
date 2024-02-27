import React, { useState } from 'react';
import '../Home/HomeStyle.css';

import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/content/CustomButton';
import TextInputCustom from '../../components/content/TextInputCustom';

const Home = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  return (
    <div className='container'>
      <h1>Home</h1>
      <button onClick={() => navigate('/profil')}>Go to Profil</button>
      <CustomButton label='button' disabled={true} />
      <TextInputCustom value={value} onChangeText={setValue} />
    </div>
  );
};

export default Home;
