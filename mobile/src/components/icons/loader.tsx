import Svg, { SvgProps, Path } from "react-native-svg";
const SvgLoader = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.5 3a9 9 0 1 0 9 9"
    />
  </Svg>
);
export default SvgLoader;
