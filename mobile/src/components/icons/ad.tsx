import Svg, { SvgProps, Path } from "react-native-svg";
const SvgAd = (props: SvgProps) => (
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
      d="M2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 15v-4.5a1.5 1.5 0 0 1 3 0V15m-3-2h3m4-4v6h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-1Z"
    />
  </Svg>
);
export default SvgAd;
