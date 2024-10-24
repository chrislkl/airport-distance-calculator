import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

const AirportSelector: React.FC<{ label: string; onAirportSelect: (airport: any) => void }> = ({ label, onAirportSelect }) => {
  const [airports, setAirports] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        // Fetch U.S. airports using the OpenAIP API endpoint
        const response = await axios.get(
          'https://api.core.openaip.net/api/airports?page=1&limit=1000&sortBy=name&sortDesc=false&country=US&apiKey=f521332962574bc300f5a27ec4a8c8d4'
        );

        // Map the response data to match the structure you need
        const usAirports = response.data.items
          .map((airport: any) => ({
            name: airport.name,
            code: airport.aitaCode, 
            lat: airport.geometry.coordinates[1],
            lon: airport.geometry.coordinates[0],
          }));

        setAirports(usAirports);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching airports:", error);
        setLoading(false);
      }
    };

    fetchAirports();
  }, []);

  return (
    <Autocomplete
      options={airports}
      getOptionLabel={(option) => `${option.name} (${option.code})`}
      onChange={(_, value) => onAirportSelect(value)}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AirportSelector;
