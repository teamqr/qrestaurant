import Svg, { SvgProps, Path } from "react-native-svg";
const SvgReceipt = (props: SvgProps) => (
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
      d="M5.5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-3-2-2 2-2-2-2 2-2-2-3 2Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.5 8H12a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 1 1 0 3h-2.5m2 0v1.5m0-9V8"
    />
  </Svg>
);
export default SvgReceipt;
