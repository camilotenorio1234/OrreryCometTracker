// src/components/CameraHandler.js
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

function CameraHandler({ setCameraDistance }) {
  const { camera } = useThree(); // Acceso a la cámara del contexto
  const cameraRef = useRef();

  useFrame(() => {
    if (camera) {
      setCameraDistance(camera.position.length()); // Actualiza la distancia de la cámara
    }
  });

  return null; // No renderiza nada
}

export default CameraHandler;
