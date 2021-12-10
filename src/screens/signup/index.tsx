import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import IsAuth from '../../components/IsAuth';

import api from '../../services';
import {IUser} from '../../types';

const SignUp: React.FC = () => {
  const navigation: void | any = useNavigation();

  const [data, setData] = useState<IUser>({} as IUser);

  const handleLogin = () => {
    navigation.navigate('Logar');
  };

  const handleRegister = useCallback(() => {
    api
      .post('users', data)
      .then(() => {
        navigation.navigate('Logar');
        setData({
          name: '',
          email: '',
          password: '',
        });
      })
      .catch(err => console.warn(err))
      .finally(() => {
        setData({
          name: '',
          email: '',
          password: '',
        });
      });
  }, [data, navigation]);

  return (
    <SafeAreaView>
      <View style={styles.default}>
        <IsAuth />
        <View style={styles.card}>
          <TextInput
            placeholder="Informe seu nome"
            onChangeText={e => setData({...data, name: e})}
          />
          <TextInput
            placeholder="Informe seu email"
            onChangeText={e => setData({...data, email: e})}
          />
          <TextInput
            placeholder="Informe sua senha"
            secureTextEntry={true}
            onChangeText={e => setData({...data, password: e})}
          />
          <Button title="Cadastrar" onPress={handleRegister} />
        </View>
        <View>
          <Text>Já possui cadastro</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text>Logar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  default: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
  card: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 12,
  },
});
