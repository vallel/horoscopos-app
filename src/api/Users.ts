import AsyncStorage from "@react-native-async-storage/async-storage";
import UserDto from "../dtos/User";

const LOCAL_USERS_STORAGE = "users_data_storage";

export async function registerUser(user: UserDto) {
  try {
    let users = await getUsers();
    users.push(user);
    await AsyncStorage.setItem(LOCAL_USERS_STORAGE, JSON.stringify(users));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUsers() {
  const response = await AsyncStorage.getItem(LOCAL_USERS_STORAGE);
  return JSON.parse(response || "[]");
}

export async function getUserByEmail(email: string) {
  let users = await getUsers();
  const result = users.filter(item => {return item.email === email});
  return result.length === 1 ? result[0] : null;
}

export async function validateCredentials(email: string, password: string) {
  let isValid = false;
  const user = await getUserByEmail(email);

  if (user) {
    isValid = user.password === password;
  }

  return isValid;
}