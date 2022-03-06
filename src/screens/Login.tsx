import { Button, StyleSheet, View } from "react-native";

export default function Login(props: any) {
  const { navigation } = props;

  const onRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.login}>
      <Button title="Login con Google" onPress={onRegister}></Button>
      <Button title="kasdjlfkaj Facebook" onPress={onRegister}></Button>
      <Button title="Email" onPress={onRegister}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    flexDirection: "column",
  },
});
