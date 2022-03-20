import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { getUserByEmail, validateCredentials } from "../api/Users";
import useAuth from "../hooks/useAuth";

export default function Login(props: any) {
  const { navigation } = props;

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const isScreenFocused = useIsFocused();
  const { auth, logIn } = useAuth();

  useEffect(() => {
    if (isScreenFocused && auth) {
      console.log("logged in");
      navigation.navigate("AlarmsList");
    }
  }, [isScreenFocused]);

  const onLogin = async () => {
    if (await validateCredentials(email, pass)) {
      logIn(await getUserByEmail(email));
      navigation.navigate("AlarmsList");
    }
  };

  const onRegisterLinkPress = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.login}>
      <Text style={styles.error}>{error}</Text>

      <TextInput
        placeholder="Email"
        textContentType="emailAddress"
        style={styles.textInput}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.textInput}
        onChangeText={(value) => setPass(value)}
      />
      <View style={styles.loginButton}>
        <Button title="Entrar" onPress={onLogin} />
      </View>

      <View style={styles.register}>
        <Text style={styles.noAccount}>¿No tienes cuenta?</Text>
        <Text style={styles.registerLink} onPress={onRegisterLinkPress}>
          Registrate
        </Text>
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
  error: {
    color: "red",
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 15,
  },
  register: {
    marginTop: 20,
  },
  noAccount: {
    textAlign: "center",
    color: "#888",
    marginBottom: 5,
  },
  registerLink: {
    textAlign: "center",
    color: "#1e90ff",
    fontWeight: "bold",
  },
});
