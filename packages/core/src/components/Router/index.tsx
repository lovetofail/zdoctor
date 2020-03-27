import React from "react";
import { NativeRouter, NativeRouterProps, BackButton } from "react-router-native";
export { Route, Switch } from "react-router-native";

export const Router: React.FC<NativeRouterProps> = ({ children, ...props }) => {
  return (
    <NativeRouter {...props}>
      <BackButton />
      {children}
    </NativeRouter>
  );
};
