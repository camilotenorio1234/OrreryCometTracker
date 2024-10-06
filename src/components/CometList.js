import React from 'react';
import CometItem from './CometItem';

const CometList = ({ comets, cameraDistance }) => {
  
  console.log("Cometas a ser renderizados:", comets); // LOG 2: Verificar lista de cometas

  return (
    <group>
      {comets.map((comet, index) => (
        <CometItem key={index} comet={comet} cameraDistance={cameraDistance} />
      ))}
    </group>
  );
};

export default CometList;
