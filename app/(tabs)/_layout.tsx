import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { View} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Image } from 'expo-image';
import { Button } from 'react-native';
import { Alert } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext } from 'react';
import { UserInfo } from 'firebase/auth';



// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;

}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs 
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#45a1ecff',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName: any
          let label = "";
          
          if (route.name == "index" ) {
            iconName = "home"
            label = "Home"
          } else if (route.name == "News" ) {
            iconName = "eye"
            label = "News"
          } else if (route.name == "Music" ) {
            iconName = "music"
            label = "Music"
          } else if (route.name == "Music" ) {
            iconName = "music"
            label = "Music"
          }else if (route.name == "Movies" ) {
            iconName = "film"
            label = "Movies"
          } else if (route.name == "Sports" ) {
            iconName = "award"
            label = "Sports"
          }
        
          return(

              <View>
              <Feather name={iconName} color={color} size={25}/>
          </View>
          )
        }
      })}>
        <Tabs.Screen
        name="Movies"
        options={{
          title: 'Movies',
          // headerRight: () => (
          //                   <Button title='Sign in with Google' onPress={promptAsyc}></Button>
          //                   )

          // headerRight: () => (
          //   <Link href="/Web_modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />     
      <Tabs.Screen
        name="Music"
        options={{
          title: 'Music',
          // headerRight: () => (
          //   <Link href="/Web_modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        
        //   headerRight: () => {
        // if (userInfo === null) {
        //   return(
                          
        //                     <View style={{flex:1, alignItems:"center"}}>
        //                     <Button title= "Sign In" onPress={promptAsyc}/>
        //                     </View>
        //   )
        // }
        // else
        //   { return (
        //       <View style={{flex:1, alignItems:"center", flexDirection:"row-reverse", padding: 10}}>
              
        //       <Button title="Signout" onPress={SignOut}></Button>
        //       <Image style = {{ width: 40, height: 40, borderRadius: 50, overflow: 'hidden', borderWidth: 1, borderColor: "#00bfff", marginRight: 5}}
        //        source={picture}></Image>
        //       <Text style={{fontFamily: "ui-monospace", fontWeight: "bold", color: "white", fontSize: 10,padding:10, top:5}}></Text>
        //       </View>
        //   )

        // }
                            
        // },
                            
          tabBarIcon: ({size,focused,color}) => {
              return (
<Image 
        source={require('@/assets/images/Watch-Haiti-Logo.png')}
        style={{height: 60, width: 60}} />
              );
            },
        }}
      />

    </Tabs>
  )
}
