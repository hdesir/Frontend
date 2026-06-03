import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes
} from '@react-native-google-signin/google-signin';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as Google from "expo-auth-session/providers/google";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from "expo-web-browser";
import * as React from 'react';
import {
  useEffect,
  useState
} from 'react';
import { Alert, Button } from 'react-native';
import 'react-native-reanimated';
export const unstable_settings = {
  anchor: '(tabs)',
};
import { useWindowDimensions, Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { View} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Image } from 'expo-image';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Route } from 'expo-router/build/Route';
import { useContext } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// import { useUser } from './hooks/useUser';

// const {username} = useUser()
export const UserContext = createContext<any>('');


interface MyProviderProps {
  children: React.ReactNode;

}

export default function RootLayout({ children}: MyProviderProps)
 {
WebBrowser.maybeCompleteAuthSession()

//  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  GoogleSignin.configure({
  webClientId: '108940570864-64h9ccojol5sjumol1obspp9e0r6brbc.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

  const [userInfo, setUserInfo] = useState<any>(null)
  const [pictures, setPicture] = useState<any>(null)
  const [request, response, promptAsyc] = Google.useAuthRequest({
    webClientId: '108940570864-64h9ccojol5sjumol1obspp9e0r6brbc.apps.googleusercontent.com'
  })
const dropList = [
    {value: 'Sign Out', label: 'Sign Out'},
    {value: 'Settings', label: 'Settings'},
  ];

const [isOpen, setIsOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
const toggleDropdown = () => setIsOpen(!isOpen);
const onItemPress = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

 const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user))
      setUserInfo(user);

  

    } catch (error) {

    }
    }
  
    React.useEffect(()=> {
      HandleGoogleSignIn()
    },[response])

  const HandleGoogleSignIn = async () => {
    const user = await AsyncStorage.getItem("@user")
    if(!user) {
      if (response?.type === "success"){
      await getUserInfo(response.authentication?.accessToken)
    }
    }else {
      setUserInfo(JSON.parse(user))
      
    }
  };

 let username = null

  if (userInfo){

  username = userInfo.name
  
  }

 let picture = "https://randomimageurl.com/assets/images/local/20260103_0518_Bold%20Abstract%20Composition_simple_compose_01ke204yvyf6pbx3ksw2cjcgkw_compressed_q80.jpeg"

  if (userInfo){

  picture = userInfo.picture
  
  }

const contextValue = {
  username,
  picture
}

//"https://randomimageurl.com/assets/images/local/20260103_0518_Bold%20Abstract%20Composition_simple_compose_01ke204yvyf6pbx3ksw2cjcgkw_compressed_q80.jpeg"

const SignOut = async (token) => {
  await AsyncStorage.removeItem("@user"); // Clear storage
  setUserInfo(null); // Update state to trigger navigation change

  }
  useNavigation()
  const colorScheme = useColorScheme();
   useEffect(() => {
  if (typeof document !== "undefined") {
    document.body.style.backgroundColor = "black";
  }
}, ["black"]);  

  //  console.log("user", username)

   const { width } = useWindowDimensions();
  
  // Define mobile breakpoint (typically 768px for tablets/desktops)
  const isDesktopWeb = Platform.OS === 'web' && width >= 450;

  if (isDesktopWeb) {
    return (
      <View style={styles.desktopContainer}>
        <Text style={styles.heading}>Mobile Only Access</Text>
        <Text style={styles.subtext}>
          This application is optimized exclusively for mobile devices. {"\n"}{"\n"}Please visit this URL from your phone.{"\n"}Desktop Version and Mobile App will be coming soon.{"\n"}{"\n"}Thanks!
        </Text>
        <Image source={require('@/assets/images/Watch-Haiti-Logo.png')} />
      </View>
    );
  }
  else
  return (
  
  <UserContext.Provider value = {{username,picture}}>
       
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={({ route }) => ({
          
        headerLeft : () => (
          <View style={{height: 70, flexDirection: "row", justifyContent:"center", alignItems: "center",left: 5, top: 5}}>
       <Image 
        source={require('@/assets/images/Watch-Haiti-Logo.png')}
        style={{position: "relative", height: 70, width: 70}} />

        </View>
    ),
          headerTitle : () => (
          <View style={{height: 70, flexDirection: "row", justifyContent:"center", alignItems: "center", top: 5}}>
       
        <View style={{borderWidth: 1, borderColor: "white", borderRadius: 9, flex:1, padding: 5}}>
        <Text style= {{color: "white", fontSize: 18, fontFamily: "San Francisco", fontWeight:"bold"}}>Watch-Haiti.com</Text>
        </View>
        </View>
    ),
    headerTitleAlign: "center",
          headerRight: () => {
                if (userInfo === null) {
                  // const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
                  return(
                                  
                                    <View style={{height: 70, flexDirection: "row", justifyContent:"center", alignItems: "center", top: 5, right: 2}}>
                                    <TouchableOpacity style= {styles.button} title= "Sign In" onPress={promptAsyc}>
                                      <Text style={styles.buttonText}>Sign In with </Text>
                                      <Image source= {require('@/assets/images/GoogleLogo.png')} style= {{height: 20, zIndex: 100, width: 20, borderWidth:1, borderColor: "white", borderRadius: 360, backgroundColor:"#FAFAFA"}} />
                                    </TouchableOpacity>
                                    </View>
                  )
                }
                else
                  { return (

                    <View>
                    <Pressable onPress={toggleDropdown}>
                      <View style={{flex:1, alignItems:"center", flexDirection:"row-reverse", padding: 10}}>
                      
                      {/* <Button title="Signout" onPress={SignOut}></Button> */}
                      <Image style = {{ width: 42, height: 42, borderRadius: 50, overflow: 'hidden', borderWidth: 1.5, borderColor: "#00bfff", marginRight: 5, top: 2}}
                       source={picture}></Image>
                       
                      <Text style={{fontFamily: "ui-monospace", fontWeight: "bold", color: "white", fontSize: 10,padding:10, top:5}}></Text>
                      
                      </View>
                      </Pressable>
      {isOpen && (
        <View style={styles.dropdownMenuStyle}>
          <Text onPress={SignOut}>Sign Out</Text>
          {/* <FlatList
            data={dropList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onItemPress(item)}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.value}
          /> */}
        </View>
      )}
    </View>
  
     



                      
                  )
        
                }
                                    
                },



                                    
                 
                })} />{children}   
        <Stack.Screen name="modal" options={{ presentation: 'card', title: 'Watch Haiti',
                    headerRight: () => {
                if (userInfo === null) {
                  // const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
                  return(
                                  
                                    <View style={{height: 70, flexDirection: "row", justifyContent:"center", alignItems: "center", top: 5, right: 2}}>
                                    <TouchableOpacity style= {styles.button} title= "Sign In" onPress={promptAsyc}>
                                      <Text style={styles.buttonText}>Sign In with </Text>
                                      <Image source= {require('@/assets/images/GoogleLogo.png')} style= {{height: 20, zIndex: 100, width: 20, borderWidth:1, borderColor: "white", borderRadius: 360, backgroundColor:"#FAFAFA"}} />
                                    </TouchableOpacity>
                                    </View>
                  )
                }
                else
                  { return (

                    <View>
                    <Pressable onPress={toggleDropdown}>
                      <View style={{flex:1, alignItems:"center", flexDirection:"row-reverse", padding: 10}}>
                      
                      {/* <Button title="Signout" onPress={SignOut}></Button> */}
                      <Image style = {{ width: 42, height: 42, borderRadius: 50, overflow: 'hidden', borderWidth: 1.5, borderColor: "#00bfff", marginRight: 5, top: 2}}
                       source={picture}></Image>
                       
                      <Text style={{fontFamily: "ui-monospace", fontWeight: "bold", color: "white", fontSize: 10,padding:10, top:5}}></Text>
                      
                      </View>
                      </Pressable>
      {isOpen && (
        <View style={styles.dropdownMenuStyle}>
          <Text onPress={SignOut}>Sign Out</Text>
          {/* <FlatList
            data={dropList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onItemPress(item)}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.value}
          /> */}
        </View>
      )}
    </View>
  
     



                      
                  )
        
                }
                                    
                },

         }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </UserContext.Provider>
  );
}
const styles = StyleSheet.create({
      dropdownMenuStyle: {
      backgroundColor: '#444546ff',
      borderRadius: 8,
    },
    button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#1E90FF', // Modern blue
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Flexible width
    shadowColor: '#000', // Optional shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5, // Android shadow
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '500',
  },
    desktopContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#aaaaaa',
    textAlign: 'center',
    maxWidth: 400,
  },
 })
