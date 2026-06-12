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
import { Link } from  'expo-router/react-navigation';
import { Image, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import { Stack } from 'expo-router';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button } from 'react-native';
import LoginForm from '../Login';
import HeaderCarousel from '@/components/headerCarousel';
import {interpolate, useAnimatedRef, useAnimatedStyle, useScrollOffset, useScrollViewOffset} from 'react-native-reanimated';
import { View } from '@/components/Themed';
import {FlatList} from 'react-native';
import { Animated } from 'react-native';
import React, { useRef } from 'react';
import { BlurView } from 'expo-blur';
import { useSharedValue } from "react-native-reanimated";
import  { Pagination } from 'react-native-reanimated-carousel';
import { useMemo } from "react";
import {
  ImageSourcePropType,
  type ImageStyle,
  type StyleProp,

  type ViewProps,
} from "react-native";

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
const [itemC, SetCarousel] = useState([
  { id:"1", uri: 'https://firebasestorage.googleapis.com/v0/b/watch-haiti.firebasestorage.app/o/OKAP-FLAGDAY.png?alt=media&token=bce8d16d-6f2e-417c-80f2-0a0d1d9bd31a', title: 'Haitian Flag Day Parade (Cap-Haitien)', videoID: 'JNejCiHieaI', _id:'6a0bd543387567a26191fb9b' , date: '2026-05-18T13:42:50.000+00:00'},
  { id:"2", uri: 'https://firebasestorage.googleapis.com/v0/b/watch-haiti.firebasestorage.app/o/ExFHnX4NWyo.jpg?alt=media&token=d61dca41-94df-47a9-bea5-63e8ec2bb89c', title: 'Kreyòl Kap Pale ak Rutshelle Guillaume', videoID: 'ExFHnX4NWyo', _id:'6988c795391e2849fe8e316a', date: '2025-12-14T05:06:43.000+00:00'},
  { id:"3", uri: 'https://firebasestorage.googleapis.com/v0/b/watch-haiti.firebasestorage.app/o/ncitBSdCxsE.jpg?alt=media&token=1c03f2e6-b425-458a-aada-3c351825f3bb', title: "MGCK - On Ti Bagay (Official Music Video)", videoID: 'ncitBSdCxsE', _id: '6986bd81819d1526d389d278', date: '2025-10-23T21:39:38.000+00:00'},
  
]);
   const [videos, setVideos] = useState([]);
   const [videoMusic, setMusic] = useState([]);
   const [videoCulture, setCulture] = useState([]);
   const [videoSport, setSport] = useState([]);
   const [classicFilm, setClassicFilm] = useState([]);
  const windowDimensions = Dimensions.get('window');

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
        };
    index: number
}

interface CarouselProps {
  item:{
        uri: string;
        id: string;
        title: string;
        _id: string;
        videoID: string;
        date: string;
        }
      }




const renderItem = ({ item, index }: ItemProps) => (
  <Link screen= "modal" params={{ id: `${item._id}`, videoID:`${item.videoID}`, relativedate: `${item.date}`}}>
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
      
        <BlurView style={styles.titleRow}>
          <View style ={styles.middleContainer}>
          <Text style={styles.videoTitle}>{item.title}</Text>
          <Text style={styles.details}> {item.channelT} {'\u00B7'} {item.viewString} views {'\u00B7'} {getRelativeTime(item.date)}</Text>
          </View>
         
        </BlurView>
        </ThemedView>
      
      </Link>
)

const renderCarousel = ({item}: CarouselProps) => (
  
    <ThemedView style = {styles.container}>
      <View style= {{flex: 1}}>

        <Image style={
            [{height: 300, width: width, resizeMode: "contain", padding: 0, marginTop: -10}, imageAnimatedStyle]}
          source={{uri: item.uri}}  /> 

          <BlurView style={{position: 'absolute', bottom: 0, width: "100%", height: "10%", borderWidth: 0, borderColor: "transparent"}}>
            <Text style={{ fontSize: 17,fontWeight: 'normal', paddingTop: 0}}>{item.title}</Text>
            <Link screen= "modal" params={{ id: `${item._id}`, videoID:`${item.videoID}`, relativedate: `${item.date}`}}>
                <Pressable style={styles.customButton} onPress={() => {}}>
                <Text style={styles.buttonText}>Watch Here</Text>
                </Pressable>
            </Link>
          </BlurView>
      </View>
         
        </ThemedView>
      // 

)

const scrollRef = useAnimatedRef<Animated.ScrollView>()
const scrollOfset = useScrollOffset(scrollRef)
const imageAnimatedStyle = useAnimatedStyle(() => {
return{
  transform: [
    {
      translateY: interpolate(
        scrollOfset.value,
        [-270,0,270],
        [-135,0,100]
      )
    },
        {
      scale: interpolate(
        scrollOfset.value,
        [-270,0,270],
        [2,1,1]
      )
    }
  ]
}
})
const ITEM_SIZE = width * 0.75;
const scrollX = useRef(new Animated.Value(0)).current;
const defaultDataWith6Colors = [
	"#B0604D",
	"#899F9C",
	"#B3C680",
	"#5C6265",
	"#F5D399",
	"#F1F1F1",
];
const scrollOffsetValue = useSharedValue<number>(0);

interface Options {
  colorFill?: boolean;
  rounded?: boolean;
  style?: StyleProp<ImageStyle>;
}

const SlideItem: React.FC<Props> = (props) => {
  const {
    style,
    index = 0,
    rounded = false,
    testID,
    colorFill = false,
    ...animatedViewProps
  } = props;

  const source = useMemo(
    () => props.source,
    [index, props.source]
  );
 
  return (
    <Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
      {!colorFill && (
        <Animated.Image
          style={[style, styles.container, rounded && { borderRadius: 15 }]}
          source={source}
          resizeMode="cover"
        />
      )}
      {colorFill && <View style={[styles.colorFill, rounded && { borderRadius: 15 }]} />}
      <View style={styles.overlay}>
        <View style={styles.overlayTextContainer}>
          <Text testID={`slide-index-${index}`} style={styles.overlayText}>{`Slide ${index}`}</Text>
        </View>
      </View>
    </Animated.View>
  );
};


const progress = useSharedValue<number>(0);
  return (
    // <Animated.ScrollView ref = {scrollRef} scrollEventThrottle={16}></Animated.ScrollView>
    <Animated.ScrollView  style={{backgroundColor: "black"}}>
      {/* <View>
        <Animated.FlatList
        data={itemC}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        contentContainerStyle={{ alignItems: 'center', margin: 0, padding: 0, height: 300, flex:1 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={renderCarousel}
      />
      </View> */}
      		<View
			id="carousel-component"
			
		>
			<Carousel
				loop={true}
        width= {width}
				snapEnabled={true}
				pagingEnabled={true}
				autoPlayInterval={1000}
        onProgressChange={progress}
				data={itemC}
				style={{ width: width, height: 258,}}
				onSnapToItem={(index) => console.log("current index:", index)}
				renderItem={renderCarousel}
			/>
      <Pagination.Basic
        progress={progress}
        data={itemC}
        dotStyle={{ backgroundColor: 'rgba(74, 72, 72, 0.42)', borderRadius: 50 }}
        activeDotStyle={{ backgroundColor: '#4A90E2' }}
        containerStyle={{ gap: 5, marginTop: 10 }}
      />
		</View>
      <GestureHandlerRootView>

      <ThemedView style={styles.stepContainer}>
<ThemedText type="subtitle" style= {{paddingBottom: 15}}>Trending in Sports</ThemedText>
      <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center", top:0, overflow: "visible", width: "105%", padding: 0, zIndex: 100, height: 250 }}>
          <Carousel style={{position:"relative", marginBottom: -50, top: -20, overflow: "visible", width: 360, backgroundColor: "black", height: 360, alignItems: "center", justifyContent: "center", zIndex:50, borderRadius: 360, borderWidth: 0.5}}
        loop


        width= {360}
        height={360}
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
      <ThemedText type="subtitle" style= {{paddingBottom: 0}}>Weekly News</ThemedText>
      <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center", top:0, overflow: "visible", width: "100%", padding: 50, zIndex: 100, backgroundColor: "black" }}>
          <Carousel style={{position:"relative", marginBottom: -50, top: -20, overflow: "visible", width: 350, backgroundColor: "#3b3b3b", height: 350, alignItems: "center", justifyContent: "center", zIndex:50, borderRadius: 360, borderWidth: 0.5}}
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
<ThemedText type="subtitle" style= {{paddingBottom: 15}}>New Music</ThemedText>
       <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center", top:0, overflow: "visible", width: "105%", padding: 50, zIndex: 100, }}>
          <Carousel style={{position:"relative", marginBottom: -50, top: -20, overflow: "visible", width: 360, backgroundColor: "black", height: 360, alignItems: "center", justifyContent: "center", zIndex:50, borderRadius: 360, borderWidth: 0.5}}
        // panGestureHandlerProps={{
        //     activeOffsetX: [-10, 10], // Enable horizontal panning
        //     failOffsetY: [-5, 5],     // Fail if significant vertical movement
        //   }}
        width= {360}
        height={360}
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
        
<ThemedText type="subtitle" style= {{paddingBottom: 15}}>Culture & Development</ThemedText>
         <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center", top:0, overflow: "visible", width: "100%", padding: 50, zIndex: 100, backgroundColor: "black" }}>
          <Carousel style={{position:"relative", marginBottom: -50, top: -20, overflow: "visible", width: 350, backgroundColor: "#3b3b3b", height: 350, alignItems: "center", justifyContent: "center", zIndex:50, borderRadius: 360, borderWidth: 0.5}}
        loop
        width= {360}
        height={360}
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
<ThemedText type="subtitle" style= {{paddingBottom: 15}}>Classic Films</ThemedText>
       <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center", top:0, overflow: "visible", width: "105%", padding: 50, zIndex: 100, }}>
          <Carousel style={{position:"relative", marginBottom: -50, top: -30, overflow: "visible", width: 360, backgroundColor: "black", height: 360, alignItems: "center", justifyContent: "center", zIndex:50, borderRadius: 360, borderWidth: 0.5}}
        width= {360}
        height={360}
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
    </Animated.ScrollView>
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
    flex: 1,
    backgroundColor: "black",
    gap: 0,
    marginBottom: 5,
    position: "relative",
    borderTopWidth: 0.5,
    width: "100%",
   height: "auto",
   paddingBottom: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingTop:5,

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
     backgroundColor: 'transparent',
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
     backgroundColor: 'transparent',
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
     backgroundColor: 'transparent',
    marginTop: "-3.5%"
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
    // backgroundColor: "rgb(14, 14, 14)",
    flexDirection: 'row',
    width: '100%',
    padding: 7,
    marginTop: 10,
    paddingBottom: 5,
    borderRadius: 13,
    marginBottom: 20,
    // borderWidth: 2, 
    // borderColor: "red",
    // marginTop: 25,
  },

  videoTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: "400",
    backgroundColor: "tansparent",
    padding: 5
    
  
  },

  details: {
    color: 'white',
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "tansparent",
    padding: 5
  },

  middleContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignContent:"center",
    borderRadius: 10, 
    overflow: "hidden"
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
  },
    card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    height: 400,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  //  overlay: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  overlayText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  overlayTextContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 10,
    minWidth: 40,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  colorFill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "gray",
  },
  customButton: {
    position: 'absolute',
    right: 5,
    bottom: 2,
    width: '15%',           // Percentage width for responsiveness
    paddingVertical: 15,    // Controls vertical thickness/height safely
    paddingHorizontal: 20,  // Controls horizontal spacing
    backgroundColor: '#000000',
    borderRadius: 8,
    alignItems: 'center',   // Centers text horizontally
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
