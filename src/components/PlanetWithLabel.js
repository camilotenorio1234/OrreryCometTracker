import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Text } from '@react-three/drei';
import { calculateOrbit } from '../utils/calculateOrbit';

function PlanetWithLabel({ a, e, size, color, orbitSpeed, label, showOrbit, showLabel, cameraDistance, inclination = 0, onClick }) {
  const ref = useRef();
  console.log(`Validando órbita para ${label}: a = ${a}, e = ${e}`);
  // Verificar si los parámetros de la órbita son válidos
  const isValidOrbit = a > 0 && e >= 0 && e < 1;
  const points = isValidOrbit ? calculateOrbit(a, e) : [];

  // Ajustar tamaño de la etiqueta según la distancia de la cámara
  const adjustedFontSize = Math.min(1.5, Math.max(0.5, 1 / cameraDistance));

  // Animar el planeta en la órbita
  useFrame((state) => {
    if (!isValidOrbit) return; // Solo ejecutar si los parámetros de la órbita son válidos

    const time = state.clock.getElapsedTime(); // Tiempo basado en el reloj global
    const theta = (time * orbitSpeed) % (Math.PI * 2); // Usamos orbitSpeed para multiplicar el tiempo
    const r = (a * (1 - e ** 2)) / (1 + e * Math.cos(theta)); // Cálculo de r basado en la ecuación kepleriana

    ref.current.position.x = r * Math.cos(theta);
    ref.current.position.z = r * Math.sin(theta);
    ref.current.rotation.x = inclination * (Math.PI / 180); // Aplicar inclinación
  });

  return (
    <>
      {isValidOrbit && (
        <>
          {/* Representación del planeta */}
          <mesh ref={ref} onClick={onClick}> {/* Ahora maneja clics */}
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial color={color} />
            {/* Etiqueta con el nombre del planeta */}
            {showLabel && (
              <Text
                position={[0, size + 0.5, 0]} // Etiqueta justo encima del planeta
                fontSize={adjustedFontSize} // Tamaño dinámico basado en la distancia
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {label}
              </Text>
            )}
          </mesh>

          {/* Representación de la órbita */}
          {showOrbit && points.length > 0 && (
            <Line
              points={points} // Puntos de la órbita calculados
              color="white" 
              lineWidth={1} 
            />
          )}
        </>
      )}
    </>
  );
}

export default PlanetWithLabel;
