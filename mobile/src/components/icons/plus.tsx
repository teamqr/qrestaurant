import Svg, { SvgProps, Path } from "react-native-svg";
const SvgPlus = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 16 16"
    color="white"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 3.333v9.334M3.333 8h9.334"
    />
  </Svg>
);
export default SvgPlus;
