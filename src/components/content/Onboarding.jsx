import React, { useMemo, useState } from 'react';
import TextInputCustom from './TextInputCustom';
import { colors } from '../../Colors';
import checkFill from '../../../src/assets/actions/check-fill.png';
import CustomButton from './CustomButton';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user';

const Onboarding = () => {
  const dispatch = useDispatch();
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [areYouHappy, setAreYouHappy] = useState(false);

  const handleGoToHome = () => {
    if (!lastName || !firstName) {
      alert('Veuillez remplir les champs');
      return;
    }
    dispatch(setUser({ lastName, firstName, areYouHappy: areYouHappy }));
  };

  const completedBgColor = useMemo(() => {
    return areYouHappy ? colors.DARK_BLUE : colors.WHITE;
  }, [areYouHappy]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            marginBottom: 20,
            fontFamily: 'IBM, sans-serif',
            fontSize: 30,
          }}
        >
          Bienvenue!
        </h1>
        <TextInputCustom
          value={lastName}
          onChangeText={setLastName}
          placeholder='Nom'
          isOptionAvailable={false}
        />
        <div style={{ margin: 10 }} />
        <TextInputCustom
          isOptionAvailable={false}
          value={firstName}
          onChangeText={setFirstName}
          placeholder='Prénom'
        />
        <div style={{ margin: 10 }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <div
            onClick={() => setAreYouHappy(!areYouHappy)}
            style={{
              border: areYouHappy ? 'none' : `1px solid ${colors.LIGHT_GREY}`,
              borderRadius: '7px',
              width: 22,
              height: 22,
              backgroundColor: completedBgColor,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <img src={checkFill} width={18} height={18} alt='icon' />
          </div>
          <p
            style={{
              marginLeft: 10,
              fontFamily: 'IBM, sans-serif',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Est-tu heureux dans ta vie ?
          </p>
        </div>

        <CustomButton
          onClick={() => handleGoToHome()}
          containerStyle={{
            width: '60%',
            marginTop: 40,
          }}
          label='GOO !!'
        />
      </div>
    </div>
  );
};

export default Onboarding;
