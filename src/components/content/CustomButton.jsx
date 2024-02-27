import React from 'react';

const CustomButton = ({ onClick, disabled, label }) => {
  const style = {
    backgroundColor: disabled ? '#5039d4' : '#74767c',
    color: 'white',
    border: 'none',
    padding: '15px',
    borderRadius: '7px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: '400px',
    fontWeight: '500',
    fontFamily: "'IBM Plex Sans', sans-serif",
    textTransform: 'uppercase',
    height: '45px',
  };

  return (
    <button onClick={onClick} disabled={disabled} style={style}>
      {label}
    </button>
  );
};

export default CustomButton;
