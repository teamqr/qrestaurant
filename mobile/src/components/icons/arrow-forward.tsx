import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgArrowForward = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="arrow-forward_svg__icon arrow-forward_svg__icon-tabler arrow-forward_svg__icon-tabler-arrow-forward"
    {...props}
  >
    <Path stroke="none" d="M0 0h24v24H0z" />
    <Path d="m15 11 4 4-4 4m4-4H8a4 4 0 0 1 0-8h1" />
  </Svg>
);
export default SvgArrowForward;
