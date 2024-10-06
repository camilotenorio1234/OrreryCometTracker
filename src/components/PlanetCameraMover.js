import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

function PlanetCameraMover({ selectedPlanet, planetPosition }) {
  const { camera } = useThree();
  const isMoving = useRef(false); // Para prevenir múltiples movimientos conflictivos

  const smoothTransition = (targetPosition, targetLookAt) => {
    if (isMoving.current) return; // Si la cámara ya se está moviendo, no hacemos nada
    isMoving.current = true;

    const startPosition = camera.position.clone();
    const steps = 100; // Cantidad de pasos para la transición suave
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const t = currentStep / steps;
      camera.position.lerpVectors(startPosition, targetPosition, t); // Mover la cámara suavemente
      camera.lookAt(targetLookAt); // Apuntar al planeta o al Sol
      if (currentStep >= steps) {
        clearInterval(interval);
        isMoving.current = false; // Permitimos nuevos movimientos una vez terminada la transición
      }
    }, 20); // Transición cada 20ms
  };

  useEffect(() => {
    if (selectedPlanet && !isMoving.current) {
      const cameraDistanceFactor = 2; // Factor para ajustar la distancia de la cámara según el tamaño del sistema
      const planetPos = new Vector3(...planetPosition);
      const cameraPosition = planetPos.clone().multiplyScalar(cameraDistanceFactor); // Ajustamos la distancia de la cámara

      smoothTransition(cameraPosition, planetPos);
    }
  }, [selectedPlanet, planetPosition]);

  return null;
}

export default PlanetCameraMover;
