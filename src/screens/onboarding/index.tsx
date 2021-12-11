import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  // TextInput,
  // TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Onboarding: React.FC = () => {
  const navigation: void | any = useNavigation();

  const handleRedirect = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView>
      <View style={styles.default}>
        <Text style={styles.title}>
          Bem vindo ao App da Tech Meliuz Turma 2
        </Text>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/M%C3%A9liuz_Logo.png/1024px-M%C3%A9liuz_Logo.png',
          }}
          style={styles.titleImage}
        />
        <View>
          <Button
            title="Cadastrar"
            onPress={() => handleRedirect('Cadastre-se')}
          />
          <View style={styles.spacing} />
          <Button title="Logar" onPress={() => handleRedirect('Logar')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  default: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    // width: '80%',
  },
  titleImage: {
    height: 150,
    width: 210,
    resizeMode: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  spacing: {
    height: 12,
  },
});
