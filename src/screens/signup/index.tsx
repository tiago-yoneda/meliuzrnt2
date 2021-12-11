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

// import IsAuth from '../../components/IsAuth';

import api from '../../services';
import {IUser} from '../../types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        <View style={styles.card}>
          <Text style={styles.title}>Cadastrar</Text>
          <View style={styles.sectionStyle}>
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color="black"
              style={styles.icons}
            />
            <TextInput
              style={styles.inputFields}
              placeholder="Informe seu nome"
              onChangeText={e => setData({...data, name: e})}
            />
          </View>
          <View style={styles.sectionStyle}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
              style={styles.icons}
            />
            <TextInput
              style={styles.inputFields}
              placeholder="Informe seu email"
              onChangeText={e => setData({...data, email: e})}
            />
          </View>
          <View style={styles.sectionStyle}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color="black"
              style={styles.icons}
            />
            <TextInput
              style={styles.inputFields}
              placeholder="Informe sua senha"
              secureTextEntry={true}
              onChangeText={e => setData({...data, password: e})}
            />
          </View>
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
    width: '80%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  inputFields: {
    width: '70%',
    textAlign: 'center',
  },
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2e4fe1',
    height: 40,
    borderRadius: 5,
    minWidth: 190,
  },
  icons: {
    marginHorizontal: 8,
  },
});
