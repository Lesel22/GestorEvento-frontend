import { icons } from "../utils/icons";

function Icon({ name, className, ...props }) {
  const src = icons[name];
  console.log(src)

  if (!src) {
    console.warn(`Icon not found: ${name}`);
    return null;
  }

  return <img src={src} alt={name} className={className} {...props} />;
}

export default Icon;
