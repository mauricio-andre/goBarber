import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  height: 60px;
  width: 100%;
  background: #ab59c1;
  flex-direction: row;
  margin-bottom: 0;
  position: absolute;
  bottom: 0;
`;

export const Button = styled(RectButton)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-size: 16px;
`;
