import Svg, { SvgProps, Path } from "react-native-svg";
const SvgRepeat = (props: SvgProps) => (
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
      d="M4 12V9a3 3 0 0 1 3-3h13m0 0-3-3m3 3-3 3m3 3v3a3 3 0 0 1-3 3H4m0 0 3 3m-3-3 3-3"
    />
  </Svg>
);
export default SvgRepeat;
