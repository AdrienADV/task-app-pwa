import React from 'react';

const TextInputCustom = ({
  disabled = false,
  value = '',
  placeholder,
  onChangeText,
  icon = 'https://picsum.photos/200/300',
}) => {
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
      height: '45px',
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
      />
      {icon && <img src={icon} width={30} height={30} alt='icon' />}
    </div>
  );
};

export default TextInputCustom;
