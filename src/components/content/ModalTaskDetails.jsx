import React, { useRef, useState } from 'react';
import { colors } from '../../Colors';
import TextInputCustom from './TextInputCustom';
import validation from '../../../src/assets/visuel/validation.json';
import Lottie from 'lottie-react';

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
  handleFileChange,
  showLottie,
}) => {
  const fileInputRef = useRef(null);
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
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
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            accept='.pdf,.png,.jpg,.jpeg'
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.DARK_BLUE,
              color: 'white',
              border: 'none',
              borderRadius: '7px',
              cursor: 'pointer',
              width: '60%',
              fontWeight: '500',
              textTransform: 'uppercase',
              fontSize: 12,
              padding: '10px 20px',
            }}
          >
            Ajouter un fichier
          </button>
          <p style={{ color: colors.LIGHT_GREY, fontSize: 10, marginTop: 4 }}>
            pdf, png, jpg, jpeg autorisé
          </p>
          {showLottie && (
            <Lottie
              animationData={validation}
              style={{
                width: 100,
                height: 100,
              }}
              loop={true}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ModalTaskDetails;
