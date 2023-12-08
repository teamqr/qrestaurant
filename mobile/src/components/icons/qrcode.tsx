import Svg, { SvgProps, Path } from "react-native-svg";
const SvgQrCode = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 33 32"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.833 22.667v.013m0-13.347v.014m13.334-.014v.014m0 9.32h-4v4m8-4v.013m-8 7.987h4m0-4h4v4m-21.334-20a1.333 1.333 0 0 1 1.334-1.334H12.5a1.333 1.333 0 0 1 1.333 1.334V12a1.333 1.333 0 0 1-1.333 1.333H7.167A1.333 1.333 0 0 1 5.833 12V6.667Zm13.334 0A1.333 1.333 0 0 1 20.5 5.333h5.333a1.333 1.333 0 0 1 1.334 1.334V12a1.333 1.333 0 0 1-1.334 1.333H20.5A1.333 1.333 0 0 1 19.167 12V6.667ZM5.833 20a1.333 1.333 0 0 1 1.334-1.333H12.5A1.333 1.333 0 0 1 13.833 20v5.333a1.333 1.333 0 0 1-1.333 1.334H7.167a1.333 1.333 0 0 1-1.334-1.334V20Z"
    />
  </Svg>
);
export default SvgQrCode;
