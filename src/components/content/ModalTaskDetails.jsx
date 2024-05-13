import React from 'react';

const ModalTaskDetails = ({ containerStyle }) => {
  const detailsType = [
    { label: 'GPS', id: 1 },
    { label: 'Fichier', id: 2 },
    { label: 'Détail 3', id: 3 },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 'calc(175px + 60px)',
        width: '100%',
        ...containerStyle,
        padding: '10px 20px',
        backgroundColor: 'white',
        borderRadius: 10,
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
      }}
    >
      {detailsType.map((detail, index) => {
        return (
          <div
            key={index}
            style={{
              padding: '10px 20px',
              boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
              marginBottom: 10,
            }}
          >
            <p>{detail.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ModalTaskDetails;
