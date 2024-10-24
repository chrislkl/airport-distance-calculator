import React, { useState } from 'react';
import { TextField, Container, Typography, Button, Grid } from '@mui/material';
import AirportSelector from './components/AirportSelector';

const App: React.FC = () => {
  const [airport1, setAirport1] = useState<any>(null);
  const [airport2, setAirport2] = useState<any>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (angle: number) => (angle * Math.PI) / 180;
    const R = 3440.06479; // Earth's radius in nautical miles

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in nautical miles
  };

  const calculateDistance = () => {
    if (airport1 && airport2) {
      const dist = haversineDistance(airport1.lat, airport1.lon, airport2.lat, airport2.lon);
      setDistance(dist);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Calculate Distance Between U.S. Airports
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <AirportSelector label="Select Departure Airport" onAirportSelect={setAirport1} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AirportSelector label="Select Arrival Airport" onAirportSelect={setAirport2} />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={calculateDistance} disabled={!airport1 || !airport2}>
        Calculate Distance
      </Button>

      {distance !== null && (
        <Typography variant="h6" gutterBottom>
          Distance: {distance.toFixed(2)} nautical miles
        </Typography>
      )}
    </Container>
  );
};

export default App;
