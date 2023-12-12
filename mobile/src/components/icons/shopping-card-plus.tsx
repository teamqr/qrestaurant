import Svg, { SvgProps, G, Path } from "react-native-svg";
const SvgShoppingCardPlus = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <G
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Path d="M4 19a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
      <Path d="M12.5 17H6V3H4" />
      <Path d="m6 5 14 1-.86 6.017M16.5 13H6m10 6h6m-3-3v6" />
    </G>
  </Svg>
);
export default SvgShoppingCardPlus;
