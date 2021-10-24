import React from 'react';

import {
  Text,
  View
} from 'react-native';
import { UserPhoto } from '../UserPhoto';

import {MotiView} from 'moti';

import { styles } from './styles';

export interface MessageProps{
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

interface Props{
  data: MessageProps;
}

export function Message({ data: {user, text} }: Props) {
  return (
    <MotiView
      from = {{opacity: 0, translateY: -50}}
      animate = {{opacity: 1, translateY: 0}}
      transition= {{type: 'timing', duration: 700}} //Timing = Animação linear.
      style = {styles.container}
    >
      <Text style = {styles.message}>
        {text}
      </Text>

      <View style = {styles.footer}>
        <UserPhoto imageUri = {user.avatar_url} size="SMALL"/>
        <Text style = {styles.userName}>
          {user.name}
        </Text>
      </View>
    </MotiView>
  );
}