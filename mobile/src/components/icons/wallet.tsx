import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const SvgWallet = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <G
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)"
    >
      <Path d="M17 8V5a1 1 0 0 0-1-1H6a2 2 0 0 0-2 2m0 0a2 2 0 0 0 2 2h12a1 1 0 0 1 1 1v3M4 6v12a2 2 0 0 0 2 2h12a1 1 0 0 0 1-1v-3" />
      <Path d="M20 12v4h-4a2 2 0 0 1 0-4h4Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgWallet;
