import React from "react";
import { Router, Route } from "./components/Router";
import { View, Text, Button, StatusBar } from "react-native";
import { RouteComponentProps } from "react-router";
export default function Routes() {
  const [isLoading, setIsLoading] = React.useState(true);

  const Splash: React.FC<RouteComponentProps> = ({ history }) => {
    return (
      <View>
        <StatusBar backgroundColor="blue" />
        <Text>splash</Text>
        <Button
          title="login"
          onPress={() => {
            history.push("/login");
          }}
        />
      </View>
    );
  };
  function Login() {
    return (
      <View>
        <StatusBar backgroundColor="blue" />
        <Text>login</Text>
      </View>
    );
  }

  return (
    <Router>
      <Route exact path="/" component={Splash} />
      <Route exact path="/login" component={Login} />
    </Router>
  );
}
