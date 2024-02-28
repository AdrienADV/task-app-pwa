import React, { useMemo } from 'react';
import { colors } from '../../Colors';

import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const TextInputCustom = ({
  disabled = false,
  value = '',
  placeholder,
  onChangeText,
  removeText = false,
  removeTextOnClick,
  isOptionAvailable = true,
  onEnterPress,
}) => {
  const colorActive = useMemo(() => {
    return value.length > 0 ? colors.DARK_BLUE : colors.LIGHT_GREY;
  }, [value]);

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      border: `2px solid ${value.length > 0 ? '#5039d4' : '#74767c'}`,
      borderRadius: '7px',
      width: '100%',
      padding: '0 12px',
      outline: 'none',
    },
    input: {
      border: 'none',
      outline: 'none',
      width: '100%',
      height: '50px',
      fontSize: 16,
      fontFamily: 'IBM, sans-serif',
    },
  };

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        type='text'
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChangeText(e.target.value)}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnterPress();
          }
        }}
      />
      {removeText && (
        <CloseIcon
          onClick={removeTextOnClick}
          style={{ cursor: 'pointer', color: colorActive }}
          width={30}
          height={30}
        />
      )}
      {isOptionAvailable && (
        <AddCircleOutlineIcon
          style={{ cursor: 'pointer', color: colorActive, marginLeft: 10 }}
          width={30}
          height={30}
        />
      )}
    </div>
  );
};

export default TextInputCustom;
