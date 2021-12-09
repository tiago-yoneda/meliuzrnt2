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
  Alert,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import api from '../../services';
export default function SignUp() {
  const navigation = useNavigation();

  const [data, setData] = useState({});

  const handleLogin = () => {
    navigation.navigate('Logar');
  };

  const handleRegister = useCallback(() => {
    api
      .post('users', data)
      .then(res => {
        navigation.navigate('Logar');
        setData({
          name: '',
          email: '',
          password: '',
        });
      })
      .catch(() => Alert('Houve algum erro'))
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
}

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
