import { Bag } from "@/src/assets";
import { Logo } from "@/src/assets/icons/logo";


export type IconName = keyof typeof iconRegistry;

export type IconBase = React.ComponentProps<"svg"> & {
  size: number;
};

export interface IconProps extends React.ComponentProps<"svg"> {
  name: IconName;
  size: number;
}

export const Icon = ({ name, size, ...svgProps }: IconProps) => {
  const SVGIcon = iconRegistry[name];

  return <SVGIcon size={size} {...svgProps} />;
};

const iconRegistry = {
  logo: Logo,
  bag: Bag,
};