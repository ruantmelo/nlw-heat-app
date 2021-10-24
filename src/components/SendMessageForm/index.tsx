import React, { useState } from 'react';

import {
  Alert,
  Keyboard,
  TextInput,
  View
} from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm(){

  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  const handleMessageSubmit =  async () => {

    const messageFormatted = message.trim();

    if (messageFormatted.length > 0) {
      setSendingMessage(true);
      await api.post('/messages', { message: messageFormatted })

      setMessage('');
      Keyboard.dismiss();
      setSendingMessage(false);
      Alert.alert('Mensagem enviada com sucesso!');
        
    }else{
      Alert.alert('Erro',  'Escreva uma mensagem para enviar');
    }
  }

  return (  
    <View style = {styles.container}>
      <TextInput
        style = {styles.input}
        keyboardAppearance = 'dark'
        placeholder = 'Qual a sua expectativa para o evento?'
        placeholderTextColor = {COLORS.GRAY_PRIMARY}
        multiline
        onChangeText = {(text) => setMessage(text)}
        value = {message}
        maxLength = {140}
        editable = {!sendingMessage}
      />

      <Button
        onPress = {handleMessageSubmit}
        title = 'Enviar mensagem'
        backgroundColor = {COLORS.PINK}
        color={COLORS.WHITE}
        isLoading = {sendingMessage}
      />
    </View>
  );
}