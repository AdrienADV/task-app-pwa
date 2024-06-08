import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { colors } from '../../Colors';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/content/CustomButton';
import { logout } from '../../store/user';
import { killDb } from '../../services/db';

const Profil = () => {
  const dispatch = useDispatch();
  const userInfos = useSelector((state) => state.user);

  const handleDeconnectUser = () => {
    dispatch(logout());
    killDb();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <AccountCircleIcon
          style={{
            fontSize: 150,
            color: colors.DARK_BLUE,
            marginBottom: 100,
            marginTop: 100,
          }}
        />
        <div
          style={{
            width: '100%',
          }}
        >
          <p
            style={{
              marginBottom: 5,
              fontWeight: 'bold',
            }}
          >
            Nom
          </p>
          <div
            style={{
              border: `1.5px solid ${colors.DARK_BLUE} `,
              padding: '5px 10px',
              borderRadius: 5,
              marginBottom: 10,
            }}
          >
            <p
              style={{
                fontSize: 20,
              }}
            >
              {userInfos.firstName}
            </p>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            marginTop: 20,
          }}
        >
          <p
            style={{
              marginBottom: 5,
              fontWeight: 'bold',
            }}
          >
            Prénom
          </p>
          <div
            style={{
              border: `1.5px solid ${colors.DARK_BLUE} `,
              padding: '5px 10px',
              borderRadius: 5,
            }}
          >
            <p
              style={{
                fontSize: 20,
              }}
            >
              {userInfos.lastName}
            </p>
          </div>
        </div>
        <p
          style={{
            marginTop: 30,
          }}
        >
          {userInfos.areYouHappy ? 'Félicitation vous êtes Heureux' : "T'es triste, Arrête"}
        </p>
        <CustomButton
          label={'Déconnexion'}
          containerStyle={{
            marginTop: 20,
          }}
          onClick={() => {
            handleDeconnectUser();
          }}
        />
      </div>
    </div>
  );
};

export default Profil;
