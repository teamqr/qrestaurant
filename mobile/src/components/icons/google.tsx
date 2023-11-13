import Svg, { SvgProps, Path } from "react-native-svg";
const SvgGoogle = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.788 5.108A9 9 0 1 0 21 12h-8"
    />
  </Svg>
);
export default SvgGoogle;
