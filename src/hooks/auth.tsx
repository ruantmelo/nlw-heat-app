import React, { createContext, useContext, useState, useEffect } from 'react';

import {api} from '../services/api';
import * as AuthSession from 'expo-auth-session';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

const CLIENT_ID = "d6eabf46557c4ac2c52a";
const SCOPE = "read:user";
const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = 'nlwheat:token';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;  
  isSigninIng: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext({} as AuthContextData);



type AuthProviderProps = {

  children: React.ReactNode;

}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  },
  type?: string;
}

function AuthProvider({children} : AuthProviderProps){
  const [user, setUser] = useState<User | null>(null);
  const [isSigninIng, setIsSigninIng] = useState(true);

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`

  useEffect(() => {
    async function loadStorageData(){
      const [token, user] = await AsyncStorage.multiGet([TOKEN_STORAGE, USER_STORAGE]);

      if(token[1] && user[1]){
        api.defaults.headers.common.authorization = `Bearer ${token[1]}`;
        setUser(JSON.parse(user[1]));
      }
      setIsSigninIng(false);
    }

    loadStorageData();
  }, [])

  async function signIn(){
    setIsSigninIng(true);
    try{
      const authSessionResponse = await AuthSession.startAsync({authUrl}) as AuthorizationResponse;
      
      if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied'){ 
        const authResponse = await api.post<AuthResponse>('/authenticate', {  code: authSessionResponse.params.code });
  
        const {token, user} = authResponse.data;
  
        api.defaults.headers.common.authorization = `Bearer ${token}`;
  
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, (token));
  
        setUser(user);
      }
    }catch(err){
      console.log('error', err);
    }finally{
      setIsSigninIng(false);
    }
  
    
  }
  

  function signOut(){
    AsyncStorage.multiRemove([USER_STORAGE, TOKEN_STORAGE]);
    setUser(null);
  }


  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      user,
      isSigninIng,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext);

  return context;
}

export {AuthProvider, useAuth}