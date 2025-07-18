import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

export const TextStyle = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props: StyleFunctionProps | Record<string, any>) => ({
      color: mode("text.dark", "text.light")(props),
      fontSize: "xl",
      fontWeight: "bold",
      lineHeight: "short",
      letterSpacing: "tight",
      title: {
        RxFontFamily: "Bree Serif",
        fontSize: "4xl",
        fontWeight: "bold",
        lineHeight: "short",
        letterSpacing: "tight",
      },
    }),
  },
  defaultProps: {},
};

export default TextStyle;
