import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PlanetWithLabel from './components/PlanetWithLabel';
import CameraHandler from './components/CameraHandler';
import CameraMover from './components/CameraMover';
import { getComets } from './api/cometService'; // Nueva importación para obtener los cometas

function App() {
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [cameraDistance, setCameraDistance] = useState(1);
  const [orbitSpeedMultiplier, setOrbitSpeedMultiplier] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showInfo, setShowInfo] = useState(true);
  const [comets, setComets] = useState([]); // Estado para almacenar los cometas

  // Factor de escala para las órbitas y tamaños
  const SCALE_FACTOR = 100;
  const SIZE_SCALE = 0.005;
  // Función para actualizar la velocidad con el slider
  const handleSpeedChange = (event) => {
    setOrbitSpeedMultiplier(parseFloat(event.target.value));
  };

  // Función para reiniciar la velocidad del slider
  const resetSpeed = () => {
    setOrbitSpeedMultiplier(1);
  };

  // Función para seleccionar el planeta y mover la cámara
  const selectPlanet = (planetName) => {
    setSelectedPlanet(planetName);
  };

  // Efecto para ocultar el texto informativo si la cámara está lo suficientemente lejos
  useEffect(() => {
    if (cameraDistance > 50) {
      setShowInfo(false);
    } else {
      setShowInfo(true);
    }
  }, [cameraDistance]);

  // Efecto para obtener los cometas automáticamente desde la API
  useEffect(() => {
    const fetchComets = async () => {
      try {
        const fetchedComets = await getComets();
        setComets(fetchedComets); // Guardamos los cometas en el estado
      } catch (error) {
        console.error('Error fetching comets:', error);
      }
    };
    fetchComets();
  }, []);

  return (
    <>
      <Canvas style={{ height: '100vh', background: 'black' }} camera={{ position: [0, 100, 300] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Componente para mover la cámara cuando se selecciona un planeta */}
        <CameraMover selectedPlanet={selectedPlanet} />

        {/* El Sol */}
        <mesh position={[0, 0, 0]} onClick={() => selectPlanet('Sol')} name="Sol">
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* Planetas */}
        <PlanetWithLabel 
          a={10} e={0.2056} size={0.5} color="blue" 
          orbitSpeed={0.0024 * orbitSpeedMultiplier} label="Mercurio" 
          showOrbit={showOrbits} showLabel={showLabels} cameraDistance={cameraDistance}
          onClick={() => selectPlanet('Mercurio')} name="Mercurio"
        />
        <PlanetWithLabel 
          a={15} e={0.0067} size={0.7} color="green" 
          orbitSpeed={0.0018 * orbitSpeedMultiplier} label="Venus" 
          showOrbit={showOrbits} showLabel={showLabels} cameraDistance={cameraDistance}
          onClick={() => selectPlanet('Venus')} name="Venus"
        />
        <PlanetWithLabel 
          a={20} e={0.0167} size={0.9} color="blue" 
          orbitSpeed={0.001 * orbitSpeedMultiplier} label="Tierra" 
          showOrbit={showOrbits} showLabel={showLabels} cameraDistance={cameraDistance}
          onClick={() => selectPlanet('Tierra')} name="Tierra"
        />
        <PlanetWithLabel 
          a={30} e={0.0934} size={0.6} color="red" 
          orbitSpeed={0.0008 * orbitSpeedMultiplier} label="Marte" 
          showOrbit={showOrbits} showLabel={showLabels} cameraDistance={cameraDistance}
          onClick={() => selectPlanet('Marte')} name="Marte"
        />
        <PlanetWithLabel 
          a={80} e={0.0484} size={2} color="orange" 
          orbitSpeed={0.00024 * orbitSpeedMultiplier} label="Júpiter" 
          showOrbit={showOrbits} showLabel={showLabels} cameraDistance={cameraDistance}
          onClick={() => selectPlanet('Júpiter')} name="Júpiter"
        />
        <PlanetWithLabel 
          a={120} e={0.0542} size={1.7} color="yellow" 
          orbitSpeed={0.00012 * orbitSpeedMultiplier} label="Saturno" 
          showOrbit={showOrbits} showLabel={showLabels} cameraDistance={cameraDistance}
          onClick={() => selectPlanet('Saturno')} name="Saturno"
        />
        <PlanetWithLabel 
          a={240} e={0.0472} size={1.2} color="lightblue" 
          orbitSpeed={0.00004 * orbitSpeedMultiplier} label="Urano" 
          showOrbit={showOrbits} showLabel={showLabels} cameraDistance={cameraDistance}
          onClick={() => selectPlanet('Urano')} name="Urano"
        />
        <PlanetWithLabel 
          a={400} e={0.0086} size={1.2} color="blue" 
          orbitSpeed={0.00002 * orbitSpeedMultiplier} label="Neptuno" 
          showOrbit={showOrbits} showLabel={showLabels} cameraDistance={cameraDistance}
          onClick={() => selectPlanet('Neptuno')} name="Neptuno"
        />

        {/* Asteroide */}
        <PlanetWithLabel 
          a={35} e={0.5} size={0.4} color="gray" 
          orbitSpeed={0.005 * orbitSpeedMultiplier} label="Asteroide 2023 XY" 
          showOrbit={showOrbits} showLabel={showLabels} cameraDistance={cameraDistance}
        />

         {/* Cometas obtenidos de la API */}
         {comets.map((comet, index) => {
    // Validar los valores de q_au_1 y q_au_2 antes de calcular el semi-eje mayor
    const q1 = parseFloat(comet.q_au_1);
    const q2 = parseFloat(comet.q_au_2);
    
    // Si uno de los valores es NaN, saltar este cometa
    if (isNaN(q1) || isNaN(q2)) {
        console.warn(`Cometa omitido por datos incompletos: ${comet.object_name}`);
        return null;
    }

    // Cálculo del semi-eje mayor promedio (a) con validación
    const a = ((q1 + q2) / 2) * SCALE_FACTOR;
    
    return (
        <PlanetWithLabel 
            key={index} 
            a={a} // Semi-eje mayor
            e={parseFloat(comet.e)} // Excentricidad
            size={0.4} 
            color="white" 
            orbitSpeed={(1 / comet.p_yr) * orbitSpeedMultiplier} // Velocidad basada en el periodo orbital
            label={comet.object_name} 
            showOrbit={showOrbits} 
            showLabel={showLabels} 
            cameraDistance={cameraDistance}
        />
    );
})}


        <OrbitControls />

        {/* Componente que maneja la distancia de la cámara */}
        <CameraHandler setCameraDistance={setCameraDistance} />
      </Canvas>

      {/* Controles para activar/desactivar órbitas y etiquetas */}
      <div style={{ position: 'absolute', top: 10, left: 10 }}>
        <button onClick={() => setShowOrbits(!showOrbits)} style={{ marginRight: '10px' }}>Toggle Orbits</button>
        <button onClick={() => setShowLabels(!showLabels)}>Toggle Labels</button>
      </div>

      {/* Control deslizante para ajustar la velocidad de las órbitas */}
      <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
        <input 
          type="range" 
          min="-500"  
          max="500"   
          step="0.1" 
          value={orbitSpeedMultiplier} 
          onChange={handleSpeedChange} 
          style={{ width: '300px' }}
        />
        <div style={{ textAlign: 'center', color: 'white' }}>Velocidad de órbita: {orbitSpeedMultiplier.toFixed(2)}x</div>
        <button 
          onClick={resetSpeed} 
          style={{ marginTop: '10px', padding: '5px 10px', background: 'white', border: 'none', cursor: 'pointer' }}
        >
          Reset Velocidad
        </button>
      </div>

      {/* Mostrar información del planeta seleccionado solo si showInfo es true */}
      {selectedPlanet && showInfo && (
        <div style={{ position: 'absolute', bottom: '100px', left: '50%', transform: 'translateX(-50%)', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '10px', borderRadius: '8px' }}>
          <h2>{selectedPlanet}</h2>
          <p>{selectedPlanet === 'Sol' ? 'El Sol es la estrella del sistema solar...' : `Información sobre ${selectedPlanet}...`}</p>
        </div>
      )}
    </>
  );
}

export default App;
