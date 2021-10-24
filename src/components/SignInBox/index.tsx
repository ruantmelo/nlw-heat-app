import React, { useContext } from 'react';

import {
  View
} from 'react-native';
import { AuthContext } from '../../hooks/auth';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles'; 

export function SignInBox(){
  const {signIn, isSigninIng} = useContext(AuthContext); 

  return (
    <View style = {styles.container}>
      <Button 
        onPress = {signIn}
        title = "Entrar com o Github"
        color = {COLORS.BLACK_PRIMARY}
        backgroundColor = {COLORS.YELLOW}
        icon = "github"
        isLoading = {isSigninIng}
      />
    </View>
  );
}