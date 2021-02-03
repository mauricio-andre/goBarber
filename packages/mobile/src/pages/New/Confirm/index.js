import React, { useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';
import api from '~/services/api';

import { Contianer, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm() {
  const route = useRoute();
  const navigation = useNavigation();
  const { provider, time } = route.params;

  const dateFormatted = useMemo(
    () =>
      formatRelative(parseISO(time), new Date(), {
        locale: pt,
      }),
    [time]
  );

  async function handlAddAppointment() {
    await api.post('appointments', {
      providerId: provider.id,
      date: time,
    });

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Contianer>
        <Avatar
          source={{
            uri:
              provider.avatar && provider.avatar.url
                ? provider.avatar.url
                : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />

        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handlAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Contianer>
    </Background>
  );
}
