import React, {useState} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

import {useDispatch} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

import api from '../../services';

import {getToken} from '../../store/modules/auth/action';

import {IsRedirect} from '../../hook';

import {IUser} from '../../types';

interface IToken {
  token: string;
}

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<IUser>({} as IUser);
  const navigation: void | any = useNavigation();
  const handleLogin = () => {
    api
      .post('session', user, {
        headers: {
          ContentType: 'application/json',
        },
      })
      .then(response => {
        console.log(response.data?.token);
        // const {token} = data;
        dispatch(getToken(response.data?.token));
        setTimeout(() => {
          navigation.navigate('dash');
        }, 3000);
      })
      .catch(err => console.warn(err))
      .finally(() => {
        setUser({
          email: '',
          password: '',
        });
      });
  };

  const handleRegister = () => {
    navigation.navigate('Cadastre-se');
  };
  return (
    <SafeAreaView>
      <View style={styles.default}>
        <View style={styles.card}>
          <Text style={styles.title}>Logar</Text>
          <View>
            <TextInput
              placeholder="email"
              value={user.email}
              onChangeText={e => setUser({...user, email: e})}
            />
            <TextInput
              placeholder="Senha"
              value={user.password}
              secureTextEntry={true}
              onChangeText={e => setUser({...user, password: e})}
            />
            <Button title="Logar" onPress={handleLogin} />
          </View>
        </View>
        <View>
          <Text>Ainda não tem uma conta?</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  default: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 12,
    minWidth: '80%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
