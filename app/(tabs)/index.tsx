import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Text } from '@/components/Themed';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Link } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import { Stack } from 'expo-router';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button } from 'react-native';
import LoginForm from '../Login';





export default function HomeScreen() {
  const getRelativeTime = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

  const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
  ];

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  for (const { unit, seconds } of units) {
    if (Math.abs(diffInSeconds) >= seconds || unit === 'second') {
      return rtf.format(Math.round(diffInSeconds / seconds), unit);
    }
  }
  return '';
};
   const [videos, setVideos] = useState([]);
   const [videoMusic, setMusic] = useState([]);
   const [videoCulture, setCulture] = useState([]);
   const [videoSport, setSport] = useState([]);
   const [classicFilm, setClassicFilm] = useState([]);
  const windowDimensions = Dimensions.get('window');
  const data = [1, 2, 3]; // Your data array
const {width} = useWindowDimensions()
const RWidth = 0.95 * width
  const [userInfo, setUserInfo] = useState<any>(null)
  const [request, response, promptAsyc] = Google.useAuthRequest({
    webClientId: '108940570864-64h9ccojol5sjumol1obspp9e0r6brbc.apps.googleusercontent.com'
  })
const fecthVideos = async (pageNum=1, refresh = false)=>{
  try{

    const response = await fetch(`https://wh-webapp-backend.onrender.com/api/videos/indexN?q=news`);
    

    const data = await response.json();
    setVideos(data)



    if(!response.ok) throw new Error(data.message || "Failed to fetch videos");

    } catch (error) {
      console.log("Error fetching books", error);
    } 
  };
    useEffect(() => {
    fecthVideos();
  }, []);

  const fecthMusic = async (pageNum=1, refresh = false)=>{
  try{

    const response = await fetch(`https://wh-webapp-backend.onrender.com/api/videos/indexN?q=music`);
    

    const music = await response.json();
    setMusic(music)
  



    if(!response.ok) throw new Error(music.message || "Failed to fetch videos");


    } catch (error) {
      console.log("Error fetching books", error);
    } 
  };
    useEffect(() => {
    fecthMusic();
  }, []);

  const fecthCulture = async (pageNum=1, refresh = false)=>{
  try{

    const response = await fetch(`https://wh-webapp-backend.onrender.com/api/videos/indexN?q=Positive`);
    

    const culture = await response.json();
    setCulture(culture)



    if(!response.ok) throw new Error(culture.message || "Failed to fetch videos");


    } catch (error) {
      console.log("Error fetching books", error);
    } 
  };
    useEffect(() => {
    fecthCulture();
  }, []);

    const fecthSport = async (pageNum=1, refresh = false)=>{
  try{

    const response = await fetch(`https://wh-webapp-backend.onrender.com/api/videos/indexN?q=Sport`);
    

    const sport = await response.json();
    setSport(sport)



    if(!response.ok) throw new Error(sport.message || "Failed to fetch videos");


    } catch (error) {
      console.log("Error fetching books", error);
    } 
  };
    useEffect(() => {
    fecthSport();
  }, []);

      const fecthFilms = async (pageNum=1, refresh = false)=>{
  try{

    const response = await fetch(`https://wh-webapp-backend.onrender.com/api/videos/indexCat?q=Classic`);
    

    const classicFilm = await response.json();
    setClassicFilm(classicFilm)



    if(!response.ok) throw new Error(classicFilm.message || "Failed to fetch videos");


    } catch (error) {
      console.log("Error fetching books", error);
    } 
  };
    useEffect(() => {
    fecthFilms();
  }, []);


interface ItemProps {
    item: {
        _id: string,
        title: string,
        RelativeDate: string,
        viewString: string,
        duration: number,
        videoUrl: string,
        imgUrl: string,
        category: string, 
        channelT: string,
        videoID: string,
        date: string
        },

    index: number
}


const renderItem = ({ item, index }: ItemProps) => (
  <Link screen= "modal" params={{ id: `${item._id}`, videoID:`${item.videoID}`}}>
    <ThemedView style = {styles.container}>
     <ThemedView style={styles.cardContainer}>
      <ThemedView style={styles.imageContainer}>
         <Image style={{
            width: RWidth,
            objectFit: "cover",
            aspectRatio: 18/11,
            borderRadius: 15,
            borderWidth: 0.20, // 5 logical pixels thick border
            borderColor: 'gray', // Blue border color
          }} source={{uri: item.imgUrl}}  />
        <ThemedView style= {styles.timeContainer}>
        <Text style={styles.time}>{item.duration}</Text>
        </ThemedView>

      </ThemedView>
      </ThemedView>
      
        <ThemedView style={styles.titleRow}>
          <ThemedView style ={styles.middleContainer}>
          <Text style={styles.videoTitle}>{item.title}</Text>
          <Text style={styles.details}> {item.channelT} {'\u00B7'} {item.viewString} views {'\u00B7'} {getRelativeTime(item.date)}</Text>
          </ThemedView>
         
        </ThemedView>
        </ThemedView>
      
      </Link>
)

  return (
    
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#000000' }}
      
      headerImage={
        <Image
          source={require('@/assets/images/Site_header.png')}
          style={styles.reactLogo}
          
        />   
      }>
      <GestureHandlerRootView>

      <ThemedView style={styles.stepContainer}>
<ThemedText type="subtitle">Trending in Sports</ThemedText>
   <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center", top:0, backgroundColor: "lightred"  }}>
      <Carousel style={{position:"relative", marginBottom: -50, top: -30}}
        loop


        width= {360}
        height={345}
        autoPlay={false}
        data={videoSport}
        scrollAnimationDuration={1000}
        mode="parallax"
				modeConfig={{
					parallaxScrollingScale: .8,
					parallaxScrollingOffset: 80,
				}}

        renderItem={renderItem}
      />
    </ThemedView>
</ThemedView>

      <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle"> Daily News</ThemedText>
      <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center", top:0 }}>
      <Carousel style={{position:"relative", zIndex: 100, marginBottom: -50, top: -30}}
        loop
        width= {360}
        height={345}
        autoPlay={false}
        data={videos}
        scrollAnimationDuration={1000}
        mode="parallax"
				modeConfig={{
					parallaxScrollingScale: .8,
					parallaxScrollingOffset: 80,
				}}

        renderItem={renderItem}
      />
    </ThemedView>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
<ThemedText type="subtitle">New Music</ThemedText>
   <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center", top:0, backgroundColor: "lightred"  }}>
      <Carousel style={{position:"relative", marginBottom: -50, top: -30}}
        loop
        // panGestureHandlerProps={{
        //     activeOffsetX: [-10, 10], // Enable horizontal panning
        //     failOffsetY: [-5, 5],     // Fail if significant vertical movement
        //   }}
        width= {360}
        height={345}
        autoPlay={false}
        data={videoMusic}
        scrollAnimationDuration={1000}
        mode="parallax"
				modeConfig={{
					parallaxScrollingScale: .8,
					parallaxScrollingOffset: 80,
				}}

        renderItem={renderItem}
      />
    </ThemedView>
</ThemedView>

      <ThemedView style={styles.stepContainer}>
        
<ThemedText type="subtitle">Culture & Development</ThemedText>
    <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center", top:0 }}>
<Carousel style={{position:"relative", zIndex: -1, marginBottom: -20, top: 15}}
        loop
        width= {360}
        height={345}
        autoPlay={false}
        data={videoCulture}
        scrollAnimationDuration={1000}
        mode="parallax"
				modeConfig={{
					parallaxScrollingScale: .8,
					parallaxScrollingOffset: 80,
				}}

        renderItem={renderItem}
      />
    </ThemedView>
</ThemedView>

      <ThemedView style={styles.stepContainer}>
<ThemedText type="subtitle">Classic Films</ThemedText>
   <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center", top:0, backgroundColor: "lightred"  }}>
      <Carousel style={{position:"relative", marginBottom: -50, top: -30}}
        loop

        width= {360}
        height={345}
        autoPlay={false}
        data={classicFilm}
        scrollAnimationDuration={1000}
        mode="parallax"
				modeConfig={{
					parallaxScrollingScale: .8,
					parallaxScrollingOffset: 80,
				}}

        renderItem={renderItem}
      />
    </ThemedView>
</ThemedView>

      </GestureHandlerRootView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: "10%"
  },
  stepContainer: {
    
    gap: 0,
    marginBottom: 5,
    position: "relative",
    borderTopWidth: 0.5,
    borderTopColor: "white",
    width: "100%",
    height: 345,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingTop:10
    // borderWidth: 2,
    // borderColor: "red"
  },
  reactLogo: {
    width: "100%",
    position: 'relative',
    marginBottom:0
    
  },
    itemContainer: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
    buttonContainer: {
borderRadius: 10,
    overflow: 'hidden', // Helps manage the background if you add one
    // backgroundColor: '#940f0f', // Example background color
    },
button: {
  marginRight: '5%',
  marginLeft: '5%'

},
    imageContainer: {
    position: "relative",
    flex: 1,
    alignItems: 'center',
    // borderWidth: 2,
   
  
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 2,
    paddingTop: 10
  },
  separator: {
    marginVertical: 30,
    marginBottom: 5,
    height: 1,
    width: '80%',

},

  cardContainer: {
    position: "relative",
    flex: 1,
    width: '100%',
    padding: '1%',
    borderRadius: '5%',
    marginBottom: '-0.5%',
    justifyContent: 'center',
    marginLeft: '0%',
    height: "auto",
  },
  image: {
    height: "100%",
    width: 'auto',
    aspectRatio: 18/11,
    borderRadius: 15,
    // borderWidth: 0.20, // 5 logical pixels thick border
    // borderColor: 'gray', // Blue border color
  },
 timeContainer:{
    backgroundColor: '#00000099',
    height: 25,
    paddingLeft: 2,
    paddingRight: 2,
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row', // Main axis is horizontal, cross-axis is vertical
    justifyContent: 'space-around', // Aligns items horizontally
    position: 'absolute',
    right: 15,
    bottom: 10,
    alignSelf: "flex-start",
  },

   IndexContainer:{
    backgroundColor: '#00000099',
    height: 25,
    paddingLeft: 2,
    paddingRight: 2,
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row', // Main axis is horizontal, cross-axis is vertical
    justifyContent: 'space-around', // Aligns items horizontally
    position: 'absolute',
    left: 15,
    bottom: 10,
    alignSelf: "flex-start",
  },
  time: {
    color: 'white',
    fontWeight: 'bold',
    //   borderWidth: 2, 
    // borderColor: "red",

  },

  titleRow: {
    display: 'flex',
    position: 'relative',
    // backgroundColor: "#1c1c1cff",
    backgroundColor: "rgb(14, 14, 14)",
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 10,
    paddingTop: 5,
    marginTop: 10,
    paddingBottom: 5,
    borderRadius: 10,
    marginBottom: 12,
    // borderWidth: 2, 
    // borderColor: "red",
    // marginTop: 25,
  },

  videoTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: "400",
    backgroundColor: "rgb(14, 14, 14)",
    
  
  },

  details: {
    color: 'grey',
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "rgb(14, 14, 14)",
    // paddingTop: 5
  },

  middleContainer: {
    flex: 1,
   
  },



pickerItem: {
    fontSize: 16,
    color: '#ffffffff',
    textAlign: 'left', // Aligns text within the wheel
    height: 100, // Important: define the same height as the container for best results
    // fontFamily: 'YourCustomFont', // Note: custom fonts require native setup
  },
   dropdownButtonStyle: {
      width: 125,
      height: 50,
      backgroundColor: '#515253ff',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      marginTop: 5
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#fcfcfcff',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#444546ff',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#ffffffff',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    imageo: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Black color with 50% opacity
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
  

});
