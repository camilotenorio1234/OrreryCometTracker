// src/components/CameraMover.js
import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

function CameraMover({ selectedPlanet }) {
  const { camera } = useThree();
  const isMoving = useRef(false); // Para prevenir múltiples movimientos conflictivos

  const smoothTransition = (targetPosition, targetLookAt) => {
    if (isMoving.current) return; // Si la cámara ya se está moviendo, no hacemos nada
    isMoving.current = true;

    const startPosition = camera.position.clone();
    const steps = 50; // Cantidad de pasos para la transición suave
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
      // Definir posiciones y enfoque basados en el planeta seleccionado
      let targetPosition;
      let targetLookAt = new Vector3(0, 0, 0); // Enfocar el Sol o el planeta
      switch (selectedPlanet) {
        case 'Sol':
          targetPosition = new Vector3(0, 10, 40);
          break;
        case 'Mercurio':
          targetPosition = new Vector3(10, 5, 20);
          targetLookAt = new Vector3(10, 0, 0);
          break;
        case 'Venus':
          targetPosition = new Vector3(15, 5, 25);
          targetLookAt = new Vector3(15, 0, 0);
          break;
        case 'Tierra':
          targetPosition = new Vector3(20, 5, 30);
          targetLookAt = new Vector3(20, 0, 0);
          break;
        case 'Marte':
          targetPosition = new Vector3(30, 5, 35);
          targetLookAt = new Vector3(30, 0, 0);
          break;
        case 'Júpiter':
          targetPosition = new Vector3(80, 20, 60);
          targetLookAt = new Vector3(80, 0, 0);
          break;
        case 'Saturno':
          targetPosition = new Vector3(120, 20, 70);
          targetLookAt = new Vector3(120, 0, 0);
          break;
        case 'Urano':
          targetPosition = new Vector3(240, 30, 100);
          targetLookAt = new Vector3(240, 0, 0);
          break;
        case 'Neptuno':
          targetPosition = new Vector3(400, 40, 120);
          targetLookAt = new Vector3(400, 0, 0);
          break;
        default:
          targetPosition = new Vector3(0, 100, 300); // Vista por defecto
          targetLookAt = new Vector3(0, 0, 0);
      }

      smoothTransition(targetPosition, targetLookAt);
    }
  }, [selectedPlanet]);

  return null;
}

export default CameraMover;
