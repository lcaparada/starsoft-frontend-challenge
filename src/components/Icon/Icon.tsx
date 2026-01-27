import { ArrowLeft, Bag, Logo, Minus, Plus, Trash } from "@/src/assets";

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
  bag: Bag,
  logo: Logo,
  plus: Plus,
  trash: Trash,
  minus: Minus,
  arrowLeft: ArrowLeft,
};