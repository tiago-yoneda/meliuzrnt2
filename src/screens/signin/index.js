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
  Alert,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import api from '../../services';
export default function SignIn() {
  const [token, setToken] = useState({});
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  const handleLogin = () => {
    api
      .post('session', user, {
        headers: {
          ContentType: 'application/json',
        },
      })
      .then(response => {
        console.log(response.data);
        setToken(response.data);
        setTimeout(() => {
          navigation.navigate('dash');
        }, 3000);
      })
      .catch(err => Alert(err))
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
          <Text>{token?.token}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
