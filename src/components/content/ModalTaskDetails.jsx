import React from 'react';
import { colors } from '../../Colors';
import TextInputCustom from './TextInputCustom';

const ModalTaskDetails = ({
  containerStyle,
  detailsType,
  selectedOption,
  options,
  cityValue,
  setCityValue,
  postalCodeValue,
  setPostalCodeValue,
  addressValue,
  setAddressValue,
}) => {
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
        boxShadow: '0px 0px 20px rgba(0,0,0,0.1)',
      }}
    >
      {options === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {detailsType.map((detail, index) => (
            <div
              onClick={() => selectedOption(detail.id)}
              key={index}
              style={{
                padding: '10px 20px',
                width: '30%',
                boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                marginBottom: 10,
                cursor: 'pointer',
                border: `2px solid ${colors.DARK_BLUE}`,
                borderRadius: '7px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p>{detail.label}</p>
            </div>
          ))}
        </div>
      ) : options === 1 ? (
        <div>
          <div
            onClick={() => selectedOption(0)}
            style={{
              position: 'absolute',
              top: 5,
              right: 10,
              cursor: 'pointer',
            }}
          >
            x
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 10,
              paddingTop: 10,
              flexWrap: 'wrap',
            }}
          >
            <TextInputCustom
              isOptionAvailable={false}
              placeholder='Adress'
              containerStyle={{ width: '50%', marginBottom: 5 }}
              onChangeText={setAddressValue}
              value={addressValue}
            />
            <TextInputCustom
              isOptionAvailable={false}
              placeholder='Postal Code'
              containerStyle={{ width: '20%', marginBottom: 5 }}
              onChangeText={setPostalCodeValue}
              value={postalCodeValue}
            />
            <TextInputCustom
              isOptionAvailable={false}
              placeholder='City'
              containerStyle={{ width: '25%', marginBottom: 5 }}
              onChangeText={setCityValue}
              value={cityValue}
            />
          </div>
        </div>
      ) : options === 2 ? (
        <div>
          <div
            onClick={() => selectedOption(0)}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              cursor: 'pointer',
            }}
          >
            x
          </div>
          <p>Ajouter un fichier</p>
        </div>
      ) : null}
    </div>
  );
};

export default ModalTaskDetails;
