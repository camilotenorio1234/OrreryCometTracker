const CometItem = ({ comet }) => {
  return (
    <li>
      <h3>{comet.object_name}</h3>
      <p>Periodo Orbital: {comet.p_yr} años</p>
      <p>Excentricidad: {comet.e}</p>
      <p>Perihelio: {comet.q_au_1} AU</p>
      <p>Afelio: {comet.q_au_2} AU</p>
    </li>
  );
};
