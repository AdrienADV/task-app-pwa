import React, { useEffect, useMemo, useState } from 'react';
import { colors } from '../../../Colors';
import './TaskStyle.css';

import checkFill from '../../../assets/actions/check-fill.png';
import navigation from '../../../assets/actions/nav-logo-white.png';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import loading from '../../../assets/visuel/loading.json';
import Lottie from 'lottie-react';
import FolderIcon from '@mui/icons-material/Folder';

const distanceBetween2CoordsinKil = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const rad = (deg) => deg * (Math.PI / 180);
  const deltaLat = rad(lat2 - lat1);
  const deltaLon = rad(lon2 - lon1);
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance.toFixed(0);
};

const Task = ({
  label,
  isCompleted,
  onDeleted,
  onClickCompletedTask,
  status,
  onClickStatus,
  type,
  detailsContent,
  onClickOpenFile,
}) => {
  const [coords, setCoords] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [location, setLocation] = useState({ latitude: null, longitude: null, error: null });
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  const statusOptions = [
    { type: 1, primary: 'green', secondary: '#CCFFCC', label: 'low' },
    { type: 2, primary: 'orange', secondary: '#FFDCA0', label: 'medium' },
    { type: 3, primary: 'red', secondary: colors.PINK_LIGHT, label: 'high' },
  ];

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [type]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocation({ ...location, error: 'Geolocation is not supported by your browser.' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          ...location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      () => {
        setLocation({ ...location, error: 'Unable to retrieve your location.' });
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
      );
      const data = await response.json();
      return { latitude: data[0].lat, longitude: data[0].lon };
    } catch (error) {
      console.error('Failed to get coordinates', error);
    }
  };

  useEffect(() => {
    async function fetchCoordinates() {
      if (type === 1 && isOnline && location.latitude) {
        try {
          const coords = await getCoordinates(detailsContent);
          setCoords(coords);
        } catch (err) {
          setError(err.message);
        }
      }
    }
    fetchCoordinates();
  }, [type, isOnline, location, detailsContent]);

  const distance = useMemo(() => {
    if (coords) {
      return distanceBetween2CoordsinKil(
        location.latitude,
        location.longitude,
        coords.latitude,
        coords.longitude
      );
    }
  }, [coords, location.latitude, location.longitude]);

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
      justifyContent: 'center',
      backgroundColor: statusDetail.secondary,
      padding: '5px 10px',
      borderRadius: 20,
      width: '80px',
    },
    text: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontWeight: 500,
      fontSize: 12,
    },
  };

  const openGoogleMaps = () => {
    if (location.latitude && location.longitude && coords) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${coords.latitude},${coords.longitude}&travelmode=driving`;
      window.open(url, '_blank');
    }
  };

  return (
    <div
      style={{
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
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            onClick={onClickCompletedTask}
            style={{
              border: isCompleted ? 'none' : `1px solid ${colors.LIGHT_GREY}`,
              borderRadius: '7px',
              width: 22,
              height: 22,
              backgroundColor: completedBgColor,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
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
      {type === 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-end',
          }}
        >
          {isOnline ? (
            <>
              {distance ? (
                <>
                  <div
                    onClick={() => openGoogleMaps()}
                    style={{
                      width: '40px',
                      aspectRatio: '1/1',
                      border: `2px solid ${colors.DARK_BLUE}`,
                      borderRadius: '7px',
                      padding: '0 12px',
                      backgroundColor: colors.DARK_BLUE,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 10,
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={navigation}
                      alt='details'
                      width={20}
                      height={20}
                      style={{ transform: 'rotate(30deg)' }}
                    />
                  </div>
                  <p>Vous êtes à {distance}km de la destination</p>
                </>
              ) : (
                <Lottie
                  animationData={loading}
                  loop={true}
                  style={{
                    width: 100,
                  }}
                />
              )}
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <p
                style={{
                  fontSize: 12,
                }}
              >
                L'adresse : {detailsContent}
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: colors.LIGHT_GREY,
                  marginLeft: 10,
                }}
              >
                connecter vous à internet pour + d'infos
              </p>
            </div>
          )}
        </div>
      )}
      {type === 2 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={() => onClickOpenFile(detailsContent)}
            style={{
              width: '40px',
              aspectRatio: '1/1',
              border: `2px solid ${colors.DARK_BLUE}`,
              borderRadius: '7px',
              padding: '0 12px',
              backgroundColor: colors.DARK_BLUE,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              cursor: 'pointer',
            }}
          >
            <FolderIcon style={{ color: colors.WHITE }} />
          </div>
          <p>Télécharger le fichier</p>
        </div>
      )}
    </div>
  );
};

export default Task;
