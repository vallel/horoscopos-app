import { useState } from "react";
import Checkbox from "expo-checkbox";
import {
  Button,
  Image,
  Keyboard,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../utils/DateTime";
import UserDto from "../dtos/User";
import { registerUser } from "../api/Users";
import getZodiacSignByDate from "../api/ZodiacSign";

export default function Register(props: any) {
  const { navigation } = props;

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [last, setLast] = useState("");
  const [birth, setBirth] = useState(new Date());
  const [birthSelected, setBirthSelected] = useState(false);
  const [gender, setGender] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onRegister = async () => {
    const user: UserDto = {
      email: email,
      password: pass,
      name: name,
      lastName: last,
      birthDate: birth,
      gender: gender,
      picture: "",
      zodiac: getZodiacSignByDate(birth),
    };

    await registerUser(user);

    navigation.navigate("EmailLogin");
  };

  const onGenderSelection = (gender: string) => {
    setGender(gender);
  };

  const onDateSelection = (event: Object, selected: any) => {
    if (selected) {
      setBirth(selected);
      setBirthSelected(true);
    }
    setShowDatePicker(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/user.png")} style={styles.image} />
      <Text style={styles.uploadPictureLink}>Subir foto</Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.textInput}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.textInput}
        value={pass}
        onChangeText={(value) => setPass(value)}
      />

      <TextInput
        placeholder="Nombre"
        style={styles.textInput}
        value={name}
        onChangeText={(value) => setName(value)}
      />
      <TextInput
        placeholder="Apellidos"
        style={styles.textInput}
        value={last}
        onChangeText={(value) => setLast(value)}
      />

      <TextInput
        placeholder="Fecha de nacimiento"
        value={birthSelected ? formatDate(birth) : ""}
        style={styles.textInput}
        onFocus={() => {
          setShowDatePicker(true);
          Keyboard.dismiss();
        }}
        onKeyPress={() => false}
      />
      {showDatePicker && (
        <DateTimePicker value={birth} mode="date" onChange={onDateSelection} />
      )}

      <View style={styles.genderInputsContainer}>
        <Text>Sexo:</Text>
        <View style={styles.checkContainer}>
          <Checkbox
            onValueChange={() => onGenderSelection("m")}
            value={gender == "m"}
            color={"#1e90ff"}
          />
          <Text style={styles.checkLabel}>M</Text>
        </View>
        <View style={styles.checkContainer}>
          <Checkbox
            onValueChange={() => onGenderSelection("h")}
            value={gender == "h"}
            color={"#1e90ff"}
          />
          <Text style={styles.checkLabel}>H</Text>
        </View>
        <View style={styles.checkContainer}>
          <Checkbox
            onValueChange={() => onGenderSelection("na")}
            value={gender == "na"}
            color={"#1e90ff"}
          />
          <Text style={styles.checkLabel}>N/A</Text>
        </View>
      </View>

      <View style={styles.loginButton}>
        <Button title="Registrar" onPress={onRegister}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 128,
    height: 128,
    alignSelf: "center",
    marginVertical: 20,
    backgroundColor: "white",
    borderRadius: 64,
  },
  uploadPictureLink: {
    color: "#1e90ff",
    textAlign: "center",
    marginBottom: 30,
    fontSize: 16,
  },
  loginButton: {
    marginTop: 20,
  },
  genderInputsContainer: {
    flexDirection: "row",
    marginVertical: 10,
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
  checkContainer: {
    flexDirection: "row",
    marginLeft: 30,
  },
  checkLabel: {
    marginLeft: 3,
  },
});
