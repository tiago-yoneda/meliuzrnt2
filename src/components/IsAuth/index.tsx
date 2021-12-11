import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, TextInput, Button, Alert} from 'react-native';

import {IAuth} from '../../types';
import api from '../../services';
import {useNavigation} from '@react-navigation/native';
import {getToken} from '../../store/modules/auth/action';
const IsAuth: React.FC = () => {
  const INITIAL_STATE = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };
  const dispatch = useDispatch();
  const navigation: void | any = useNavigation();
  const resetFields = () => setPasswords(INITIAL_STATE);
  const [passwords, setPasswords] = useState({...INITIAL_STATE});
  const globalState = useSelector((state: IAuth) => state);

  const handleConfirm = () => {
    const {oldPassword, password, confirmPassword} = passwords;
    if (password && oldPassword && confirmPassword) {
      const {token} = globalState.auth;
      api
        .put('users', passwords, {
          headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          if (response.status === 200) {
            Alert.alert('Senha modificada com sucesso');
          }
        })
        .catch(err => console.warn(err))
        .finally(() => resetFields());
    } else {
      Alert.alert('Por favor preencha todos os campos');
    }
  };

  const handleLogout = () => {
    resetFields();
    dispatch(getToken(''));
    navigation.navigate('Cadastre-se');
  };

  return (
    <View>
      <Text>Está autenticado? {globalState.auth.token ? 'sim' : 'não'}</Text>
      <TextInput
        secureTextEntry={true}
        value={passwords.oldPassword}
        onChangeText={e => setPasswords({...passwords, oldPassword: e})}
        placeholder="Old password"
      />
      <TextInput
        secureTextEntry={true}
        value={passwords.password}
        onChangeText={e => setPasswords({...passwords, password: e})}
        placeholder="New password"
      />
      <TextInput
        secureTextEntry={true}
        value={passwords.confirmPassword}
        onChangeText={e => setPasswords({...passwords, confirmPassword: e})}
        placeholder="Confirm new password"
      />
      <Button title="Confirmar" onPress={handleConfirm} />
      <Button title="Cancelar" onPress={resetFields} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default IsAuth;
