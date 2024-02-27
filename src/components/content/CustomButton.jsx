import React from 'react';
import { colors } from '../../Colors';

const CustomButton = ({ onClick, disabled, label, containerStyle }) => {
  const style = {
    backgroundColor: disabled ? colors.LIGHT_GREY : colors.DARK_BLUE,
    color: 'white',
    border: 'none',
    borderRadius: '7px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: '100%',
    fontWeight: '500',
    fontFamily: "'IBM Plex Sans', sans-serif",
    textTransform: 'uppercase',
    height: '45px',
  };

  return (
    <button onClick={onClick} disabled={disabled} style={{ ...style, ...containerStyle }}>
      {label}
    </button>
  );
};

export default CustomButton;
