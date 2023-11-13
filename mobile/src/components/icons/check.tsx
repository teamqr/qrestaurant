import Svg, { SvgProps, Path } from "react-native-svg";
const SvgCheck = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m3.333 8 3.334 3.333 6.666-6.666"
    />
  </Svg>
);
export default SvgCheck;
