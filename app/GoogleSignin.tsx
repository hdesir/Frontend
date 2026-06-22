// export function UserProvider ({ children }) {
//     WebBrowser.maybeCompleteAuthSession()
    
//       GoogleSignin.configure({
//       webClientId: '108940570864-64h9ccojol5sjumol1obspp9e0r6brbc.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
//       offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//       hostedDomain: '', // specifies a hosted domain restriction
//       googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
//       openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//       profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
//     });
    
//       const [userInfo, setUserInfo] = useState<any>("Henley")
//       const [pictures, setPicture] = useState<any>("")
//       const [request, response, promptAsyc] = Google.useAuthRequest({
//         webClientId: '108940570864-64h9ccojol5sjumol1obspp9e0r6brbc.apps.googleusercontent.com'
//       })
    
    
//      const getUserInfo = async (token) => {
//         if (!token) return;
//         try {
//           const response = await fetch(
//             "https://www.googleapis.com/userinfo/v2/me",
//             {
//               headers: {Authorization: `Bearer ${token}`}
//             }
//           );
    
//           const user = await response.json();
//           await AsyncStorage.setItem("@user", JSON.stringify(user))
//           setUserInfo(user);
      
    
//         } catch (error) {
    
//         }
//         }
      
//         React.useEffect(()=> {
//           HandleGoogleSignIn()
//         },[response])
    
//       const HandleGoogleSignIn = async () => {
//         const user = await AsyncStorage.getItem("@user")
//         if(!user) {
//           if (response?.type === "success"){
//           await getUserInfo(response.authentication?.accessToken)
//         }
//         }else {
//           setUserInfo(JSON.parse(user))
//         }
//       };
    
//      const username = "Henley";
    
//     //"https://randomimageurl.com/assets/images/local/20260103_0518_Bold%20Abstract%20Composition_simple_compose_01ke204yvyf6pbx3ksw2cjcgkw_compressed_q80.jpeg"
    
//       const SignOut = async () => {
//         setUserInfo(null)
//         setPicture(null)
    
//       } 

//       return(
//         <UserContext.Provider value = {{ setUserInfo }}>
//         {children}
//         </UserContext.Provider>
//       )

//     }