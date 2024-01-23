import Svg, { SvgProps, Path } from "react-native-svg";
const SvgUserEdit = (props: SvgProps) => (
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
      d="M6 21v-2a4 4 0 0 1 4-4h3.5M8 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm10.42 8.61a2.1 2.1 0 1 1 2.97 2.97L18 22h-3v-3l3.42-3.39Z"
    />
  </Svg>
);
export default SvgUserEdit;
