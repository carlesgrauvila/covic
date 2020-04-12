import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text, StatusBar,SafeAreaView, Platform, Linking } from 'react-native';
import { Center } from '@builderx/utils';
import MainPage from './pages/MainPage'
import Test from './pages/Test'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();



sosCall = () => {
 
    let phoneNumber = '';
 
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${016}';
    }
    else {
      phoneNumber = 'telprompt:${016}';
    }
 
    Linking.openURL(phoneNumber);
};

function LogoTitle() {
  return (
    <Image resizeMode='contain' style={{width:80, height:80}} source={require('./assets/logo.png')} />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerStyle: {
          backgroundColor: '#E6C1BA',
          shadowRadius: 0,
    		  shadowOffset: {
    			 height: 0,
		      },
          elevation:0
        },
        headerTitleStyle:{
          alignSelf:"center",
        },
        headerTitle: props => <LogoTitle {...props} />,
        headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
    			    style={styles.sosButton}
    			    onPress={() => sosCall()}
    			    underlayColor='#fff'>
			           <Text style={{color:"#E6C1BA"}}>SOS</Text>
			     </TouchableOpacity>
         ),
      }}>
        <Stack.Screen name="Home">
        	{props => <MainPage {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Test" options={ () => ({headerBackTitle:"Tornar",headerTintColor:"#CC5851" }) }>
        	{props => <Test {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sosButton: {
    backgroundColor:"#CC5851", 
    height:50, 
    width:50, 
    borderRadius:40, 
    alignItems:"center", 
    justifyContent:"center", 
    marginRight:20, 
    marginTop:5
  },
})
