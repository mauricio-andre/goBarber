import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Background from '~/components/Background';
import api from '~/services/api';

import { Contianer, ProvidersList, Provider, Avatar, Name } from './styles';

export default function SelectProvider() {
  const navigation = useNavigation();
  const [prociders, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');
      setProviders(response.data);
    }

    loadProviders();
  }, []);

  return (
    <Background>
      <Contianer>
        <ProvidersList
          data={prociders}
          keyExtractor={(provider) => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider
              onPress={() =>
                navigation.navigate('SelectDateTime', { provider })
              }
            >
              <Avatar
                source={{
                  uri:
                    provider.avatar && provider.avatar.url
                      ? provider.avatar.url
                      : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                }}
              />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Contianer>
    </Background>
  );
}
