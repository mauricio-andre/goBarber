import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import { Container, Button, TextButton } from './styles';

/**
 * Componente criado como alternativa ao @react-navigation/bottom-tabs
 * a lib citada esta apresentando erro que deve ser verificado mais tarde
 */
export default function BottomTabs() {
  const navigation = useNavigation();

  return (
    <Container>
      <Button onPress={() => navigation.navigate('Dashboard')}>
        <Icon name="event" size={20} color="#fff" />
        <TextButton>Agendamentos</TextButton>
      </Button>
      <Button onPress={() => navigation.navigate('SelectProvider')}>
        <Icon name="add-circle-outline" size={20} color="#fff" />
        <TextButton>Agendar</TextButton>
      </Button>
      <Button onPress={() => navigation.navigate('Profile')}>
        <Icon name="person" size={20} color="#fff" />
        <TextButton>Meu perfil</TextButton>
      </Button>
    </Container>
  );
}
