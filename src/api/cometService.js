import axios from 'axios';

const API_URL = 'https://data.nasa.gov/resource/b67r-rgxc.json'; // Verifica que esta sea la URL correcta

export const getComets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.map(comet => ({
      ...comet,
      q_au_2: parseFloat(comet.q_au_2),
      eccentricity: parseFloat(comet.eccentricity),
      full_name: comet.full_name || 'Unnamed Comet',
    }));
  } catch (error) {
    console.error('Error fetching comets:', error);
    throw error;
  }
};
