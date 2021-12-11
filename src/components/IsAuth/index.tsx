import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {IAuth} from '../../types';
import api from '../../services';
import {useNavigation} from '@react-navigation/native';
import {getToken} from '../../store/modules/auth/action';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    <SafeAreaView>
      <View style={styles.default}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Está autenticado? {globalState.auth.token ? 'sim' : 'não'}
          </Text>
          <View style={styles.sectionStyle}>
            <MaterialCommunityIcons
              name="lock-clock"
              size={24}
              color="black"
              style={styles.icons}
            />
            <TextInput
              style={styles.inputFields}
              secureTextEntry={true}
              value={passwords.oldPassword}
              onChangeText={e => setPasswords({...passwords, oldPassword: e})}
              placeholder="Old password"
            />
          </View>
          <View style={styles.sectionStyle}>
            <MaterialCommunityIcons
              name="lock-plus"
              size={24}
              color="black"
              style={styles.icons}
            />
            <TextInput
              style={styles.inputFields}
              secureTextEntry={true}
              value={passwords.password}
              onChangeText={e => setPasswords({...passwords, password: e})}
              placeholder="New password"
            />
          </View>
          <View style={styles.sectionStyle}>
            <MaterialCommunityIcons
              name="lock-check"
              size={24}
              color="black"
              style={styles.icons}
            />
            <TextInput
              style={styles.inputFields}
              secureTextEntry={true}
              value={passwords.confirmPassword}
              onChangeText={e =>
                setPasswords({...passwords, confirmPassword: e})
              }
              placeholder="Confirm new password"
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Button title="Confirmar" onPress={handleConfirm} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Button title="Cancelar" onPress={resetFields} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Button title="Logout" onPress={handleLogout} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IsAuth;

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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginVertical: 5,
    borderRadius: 15,
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
