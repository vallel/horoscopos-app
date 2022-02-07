import { Button, View } from 'react-native';

export default function Login(props: any) {

  const onRegister = () => {
    props.navigation.navigate('Register');
  }

  return (
    <View>
      <Button title='Login con Google' onPress={onRegister}></Button>
      <Button title='kasdjlfkaj Facebook' onPress={onRegister}></Button>
      <Button title='Email' onPress={onRegister}></Button>
    </View>
  );
}