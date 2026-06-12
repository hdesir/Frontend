import { FlatList, Image, RefreshControl, StyleSheet } from 'react-native';


import { Text, View, } from '@/components/Themed';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from "react";
import { useWindowDimensions } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

import { Link } from  'expo-router/react-navigation';
import { Platform } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';


const API_BASE_URL = Platform.OS === 'web' 
  ? "/Web_model" // URL for web
  : "/modal"; // URL for native (iOS/Android)


const TaskSchema = {
  name: "Task",
  
}



 

export default function  Music() {
  const [videos, setVideos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("music")
  const [category, setCategory] = useState("Trending");
  const MuiscCategories= [
    {title: 'Trending', category: 'music'},
    {title: 'Live Shows', category: 'Live'},
    {title: 'Gospel', category: 'Gospel' },
    {title: '2000s', category: '2000s'},
    {title: '1990s', category: '1990s'},
    // {title: 'Orchaestra', category: 'formal'},
    {title: 'Rap', category: 'Rap'},
 
  ];
    

const {width} = useWindowDimensions()
const RWidth = 0.95 * width

const fecthVideos = async (query: string,pageNum=1, refresh = false)=>{
  
  try{
    
    const response = await fetch(`https://wh-webapp-backend.onrender.com/api/videos/category?q=${query || "music"}`);
    
    const data = await response.json();
    setVideos(data)

    if(!response.ok) throw new Error(data.message || "Failed to fetch videos");

    } catch (error) {
      console.log("Error fetching books", error);
    } 
  };
    useEffect(() => {
    fecthVideos(query,1,true);
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
        date: string,
        }
    index: number
}


const renderItem = ({ item, index }: ItemProps) => (
  <Link screen= "modal" params={{ id: `${item._id}`, videoID:`${item.videoID}`, relativedate: `${item.date}`}}>
    <View>
     <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image style={{
    width: RWidth,
    objectFit: "cover",
    aspectRatio: 18/11,
    borderRadius: 15,
    borderWidth: 0.20, // 5 logical pixels thick border
    borderColor: 'gray', // Blue border color
  }} source={{uri: item.imgUrl}}  />
        <View style= {styles.timeContainer}>
        <Text style={styles.time}>{item.duration}</Text>
        </View>
        <View style = {styles.IndexContainer}>
        <Text style={styles.time}># {index + 1 } in {category}</Text>
        </View>
      </View>
      </View>
      
        <View style={styles.titleRow}>
          <View style ={styles.middleContainer}>
          <Text style={styles.videoTitle}>{item.title}</Text>
          <Text style={styles.details}> {item.channelT} {'\u00B7'} {item.viewString} views {'\u00B7'} {item.RelativeDate}</Text>
          </View>
          <AntDesign name="more" size={24} color="white" />
        </View>
      </View>
      </Link>

)

  return (
 
    <View style={styles.container}>
      <View>
       <Text style ={styles.title}>{category} | Music</Text>
       <View style={{ marginTop: 15, marginBottom: -10,justifyContent: 'center', alignItems: 'center' }}>
       
<SelectDropdown 
    data={MuiscCategories}
    
    onSelect={(selectedItem, index) => {
    fecthVideos(selectedItem.category, 1, true)
    setQuery(selectedItem.category)
    setCategory(selectedItem.title)
    setPage(1)
    console.log(query);
    
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={styles.dropdownButtonStyle}>
          <Image style ={{position: "absolute", maxHeight: "30%", width: "12%", zIndex: 1, right: 12}} source={require('../(tabs)/img/Logo/icons8-down-arrow-50.png')}/>
          {selectedItem && (
            <Text style ={{display:"none"}}>{selectedItem.icon}</Text>
          )}
          <Text style={styles.dropdownButtonTxtStyle}>
            {(selectedItem && selectedItem.title) || 'Trending'}
          </Text>
        
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={{backgroundColor: '#444546ff', borderRadius: 8,}}
  />

    </View>
    </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <View style={styles.container}>
        <FlatList 
        data ={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} 
        refreshControl={

          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fecthVideos(query,1, true)}
            
          />
        }
        />

    </View>
    </View> 

  );
};

const styles = StyleSheet.create({
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
    objectFit: "cover",
    width: "100%",
    padding: '1%',
    borderRadius: '5%',
    marginBottom: '-0.5%',
    justifyContent: 'center',
    marginLeft: '0%',

  },
  // image: {
  //   width: width,
  //   objectFit: "cover",
  //   aspectRatio: 18/11,
  //   borderRadius: 15,
  //   borderWidth: 0.20, // 5 logical pixels thick border
  //   borderColor: 'gray', // Blue border color
  // },
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
    backgroundColor: "#1c1c1cff",
    flexDirection: 'row',
    width: '97%',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    marginBottom: 12,
    // borderWidth: 2, 
    // borderColor: "red",
    // marginTop: 25,
  },

  videoTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "400",
    backgroundColor: "#1c1c1cff",
    
  
  },

  details: {
    color: 'grey',
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "#1c1c1cff",
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
