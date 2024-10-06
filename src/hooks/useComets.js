// src/hooks/useComets.js
import { useState, useEffect } from 'react';
import { getComets } from '../api/cometService';

export const useComets = () => {
  const [comets, setComets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComets = async () => {
      setLoading(true);
      try {
        const fetchedComets = await getComets(); // Aquí verificamos
        console.log(fetchedComets);  // Asegúrate de que la API devuelve todos los datos
        setComets(fetchedComets); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
 
    fetchComets();
  }, []);

  return { comets, loading, error };
};
