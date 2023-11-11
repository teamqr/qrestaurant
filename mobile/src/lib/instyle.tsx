import { ComponentProps, ComponentType, FC } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type Style = TextStyle | ViewStyle;

type InstyleOptions<
  Variants extends string,
  DefaultVariant extends Variants,
> = {
  style: Style;
  variants: {
    [key in Variants]: Style;
  };
  defaultVariant: DefaultVariant;
};

type InstyledComponent<Props = {}> = FC<Props>;

function instyle<
  Variants extends string,
  DefaultVariant extends Variants,
  InstyleElement extends FC<any>,
  Props = ComponentProps<InstyleElement>,
>(
  component: InstyleElement,
  options: InstyleOptions<Variants, DefaultVariant>,
): InstyledComponent<Props & { variant?: Variants }> {
  const { style: defaultStyle, defaultVariant, variants } = options;
  const styles = StyleSheet.create(variants);

  return (props) => {
    const Component = component as ComponentType<Props>;
    const { variant } = props;

    const style = { ...defaultStyle, ...styles[variant ?? defaultVariant] };

    return (
      <Component
        {...props}
        style={[style, "style" in props ? props.style : {}]}
      />
    );
  };
}

export { instyle };
