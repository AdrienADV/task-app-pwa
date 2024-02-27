import React, { useMemo } from 'react';
import { colors } from '../../Colors';

import checkFill from '../../assets/actions/check-fill.png';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Task = ({ label, isCompleted, onDeleted, onClickCompletedtask }) => {
  const completedBgColor = useMemo(() => {
    return isCompleted ? colors.DARK_BLUE : colors.WHITE;
  }, [isCompleted]);

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
          backgroundColor: colors.PINK_LIGHT,
          padding: 10,
          borderRadius: '50%',
        }}
        onClick={onDeleted}
      >
        <DeleteOutlineIcon style={{ cursor: 'pointer', color: colors.RED_LIGHT }} />
      </div>
    </div>
  );
};

export default Task;
