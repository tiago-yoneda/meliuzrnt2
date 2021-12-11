import React, {useState, useEffect} from 'react';

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

import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

import api from '../../services';

import {getToken} from '../../store/modules/auth/action';

import {IUser} from '../../types';

import jwt_decode, {JwtPayload} from 'jwt-decode';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
interface IToken {
  token: string;
}

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state: any) => state);
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
        dispatch(getToken(response.data));
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

  const isAuth = () => {
    if (globalState.auth.token) {
      const tokenPayload = jwt_decode<JwtPayload>(globalState.auth.token);
      const expToken = tokenPayload?.exp;
      const timeNow = Date.now() / 1000;
      if (expToken) {
        return timeNow > expToken ? false : true;
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isAuth()) {
      navigation.navigate('dash');
    }
  });

  const handleRegister = () => {
    navigation.navigate('Cadastre-se');
  };

  return (
    <SafeAreaView>
      <View style={styles.default}>
        <View style={styles.card}>
          <Text style={styles.title}>Logar</Text>
          <View style={styles.sectionStyle}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
              style={styles.icons}
            />
            <TextInput
              style={styles.inputFields}
              placeholder="email"
              value={user.email}
              onChangeText={e => setUser({...user, email: e})}
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
              placeholder="Senha"
              value={user.password}
              secureTextEntry={true}
              onChangeText={e => setUser({...user, password: e})}
            />
          </View>
          <Button title="Logar" onPress={handleLogin} />
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
