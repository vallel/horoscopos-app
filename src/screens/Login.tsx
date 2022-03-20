import { Button, StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

export default function Login(props: any) {
  const { navigation } = props;

  const isScreenFocused = useIsFocused();
  const { auth, logIn } = useAuth();

  useEffect(() => {
    if (isScreenFocused && auth) {
      console.log("logged in");
      navigation.navigate("AlarmsList");
    }
  }, [isScreenFocused]);

  const onRegister = () => {
    navigation.navigate("EmailLogin");
  };

  const onGoogleLogin = () => {};

  const onFacebookLogin = () => {};

  return (
    <View style={styles.login}>
      <View style={styles.loginButton}>
        <Button
          title="Iniciar sesión con Google"
          color={"#DB4437"}
          onPress={onGoogleLogin}
        ></Button>
      </View>
      <View style={styles.loginButton}>
        <Button
          title="Iniciar sesión con Facebook"
          color={"#4267B2"}
          onPress={onFacebookLogin}
        ></Button>
      </View>
      <View style={styles.loginButton}>
        <Button
          title="Iniciar sesión con Email"
          color={"grey"}
          onPress={onRegister}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    marginHorizontal: 10,
    marginVertical: 50,
    flexDirection: "column",
  },
  loginButton: {
    marginBottom: 20,
  },
});
