// Carga todos los SVG de la carpeta (SE EJECUTA UNA SOLA VEZ)
const files = import.meta.glob('../assets/icons/*.svg', { eager: true });

// Diccionario optimizado
export const icons = {};

for (const [path, module] of Object.entries(files)) {
  // Extraer nombre: tabler_lock-filled
  const name = path.split('/').pop().replace('.svg', '');
  icons[name] = module.default;
  
}

