import React, { useEffect, useState } from 'react';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

const GeolocationExample: React.FC = () => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => setLocation({ ...location, error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  return (
    <div>
      {location.error ? (
        <div>Error: {location.error}</div>
      ) : (
        <div>
          Latitude: {location.latitude}
          <br />
          Longitude: {location.longitude}
        </div>
      )}
    </div>
  );
}

export default GeolocationExample;
