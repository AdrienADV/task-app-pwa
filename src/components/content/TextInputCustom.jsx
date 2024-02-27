import React, { useState, useRef } from 'react';

const TextInputCustom = ({
  disabled = false,
  value = '',
  placeholder,
  onChangeText,
  icon = null,
}) => {
  const styles = {
    containerInput: {
      borderColor: value.length > 0 ? '1px solid #5039d4' : '1px solid #dcdcdc',
      borderRadius: '7px',
      borderWidth: '2px',
      width: '400px',
      height: '45px',
      outline: 'none',
    },
  };
  return (
    <>
      <div>
        <div>
          {icon && <img src={icon} className='iconStyle' alt='icon' />}
          <input
            style={styles.containerInput}
            type={'text'}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChangeText(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
    </>
  );
};

export default TextInputCustom;
