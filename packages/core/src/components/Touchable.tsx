import React from "react";
import { TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import { mediumShadow } from "../utils/values";

export type TouchableProps = TouchableOpacityProps & {
  borderRadius?: number;
  style?: ViewStyle;
  shadow?: boolean;
};

const Touchable: React.FC<TouchableProps> = ({ children, style, borderRadius = 5, shadow = false, ...props }) => {
  return (
    <TouchableOpacity {...props} style={[style, { borderRadius }, shadow && mediumShadow]}>
      {children}
    </TouchableOpacity>
  );
};
export default Touchable;
