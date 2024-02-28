import React, { useMemo, useState } from 'react';
import { colors } from '../../../Colors';
import './TaskStyle.css';

import checkFill from '../../../assets/actions/check-fill.png';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Task = ({ label, isCompleted, onDeleted, onClickCompletedtask, status, onClickStatus }) => {
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  const statusOptions = [
    { type: 1, primary: 'green', secondary: '#CCFFCC', label: 'low' },
    { type: 2, primary: 'orange', secondary: '#FFDCA0', label: 'medium' },
    { type: 3, primary: 'red', secondary: colors.PINK_LIGHT, label: 'high' },
  ];

  const completedBgColor = useMemo(() => {
    return isCompleted ? colors.DARK_BLUE : colors.WHITE;
  }, [isCompleted]);

  const statusDetail = useMemo(() => {
    const statusObj = statusOptions.find((option) => option.type === status);
    return statusObj;
  }, [status]);

  const renderStatusOptions = () => {
    return statusOptions
      .filter((option) => option.type !== status)
      .map((option) => (
        <div
          key={option.type}
          style={{
            ...stylesStatus.container,
            backgroundColor: option.secondary,
            cursor: 'pointer',
            marginTop: 5,
          }}
          onClick={() => {
            onClickStatus(option.type);
            setShowStatusOptions(false);
          }}
        >
          <div style={{ ...stylesStatus.point, backgroundColor: option.primary }}></div>
          <p style={stylesStatus.text}>{option.label}</p>
        </div>
      ));
  };

  const stylesStatus = {
    point: {
      width: 10,
      height: 10,
      backgroundColor: statusDetail.primary,
      borderRadius: '50%',
      marginRight: 5,
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: statusDetail.secondary,
      padding: '5px 20px',
      borderRadius: 20,
      width: '80px',
    },
    text: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontWeight: 500,
      fontSize: 12,
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: 7,
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
        padding: '10px',
        margin: '15px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          onClick={onClickCompletedtask}
          style={{
            border: isCompleted ? 'none' : `1px solid ${colors.LIGHT_GREY} `,
            borderRadius: '7px',
            width: 22,
            height: 22,
            backgroundColor: completedBgColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={checkFill} width={18} height={18} alt='icon' />
        </div>
        <p
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 500,
            fontStyle: 'normal',
            marginLeft: 10,
          }}
        >
          {label}
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={stylesStatus.container}
            onClick={() => setShowStatusOptions(!showStatusOptions)}
          >
            <div style={stylesStatus.point}></div>
            <p style={stylesStatus.text}>{statusDetail.label}</p>
          </div>
          {showStatusOptions && (
            <span className='statusOptionsAnimation'>{renderStatusOptions()}</span>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: colors.PINK_LIGHT,
            padding: 10,
            borderRadius: '50%',
            marginLeft: 15,
          }}
          onClick={onDeleted}
        >
          <DeleteOutlineIcon style={{ cursor: 'pointer', color: colors.RED_LIGHT }} />
        </div>
      </div>
    </div>
  );
};

export default Task;
