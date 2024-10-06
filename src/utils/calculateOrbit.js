export function calculateOrbit(a, e, steps = 100) {
        // Validar parámetros de órbita
        if (isNaN(a) || isNaN(e) || a <= 0 || e < 0 || e >= 1) {
            console.error('Parámetros de órbita inválidos: a debe ser > 0, y e debe estar entre 0 y 1.');
            return [];
        }
    
        const points = [];
        for (let i = 0; i < steps; i++) {
            const theta = (i / steps) * Math.PI * 2; // Ángulo en radianes
            const r = (a * (1 - e ** 2)) / (1 + e * Math.cos(theta)); // Distancia al centro
    
            // Validar que r sea un número válido
            if (isNaN(r) || r < 0) {
                console.error(`Valor de r inválido: ${r}. Verifica los parámetros de la órbita.`);
                return [];
            }
    
            const x = r * Math.cos(theta); // Coordenada X
            const z = r * Math.sin(theta); // Coordenada Z (en lugar de Y en 2D)
            points.push([x, 0, z]); // Mantén Y=0 para simplificar (plano)
        }
    
        return points;
    }
    