import { Text } from '@/components/Themed';
import { useRoute } from  '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, KeyboardAvoidingView, Platform, Pressable, RefreshControl, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import picture from './(tabs)/_layout'
import username from './(tabs)/_layout'
import { useContext } from 'react';
import { UserContext } from './_layout';
import { Image } from 'expo-image';


export default function ModalScreen({}) {


  


interface Comment {
  username: string;
  comment: string;
}

interface ItemProps {
  id: string,
  videoID: string
}

interface ItemProps {
  user: any
}
interface VideoProps {
    video: {
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
        user: any,
        date: string,
        }
      }

interface Comment {
    item: {
        _id: string,
        username: string,
        comment: string,
        picture: string,
        createdAt: string,
        },
}
const dropList = [
    {title: 'Sign Out', category: 'Sign Out'},
    {title: 'Settings', category: 'Settings'},
  ];




const user = useContext(UserContext)
const insets = useSafeAreaInsets();
const route = useRoute();
const { id, videoID, relativedate}= route?.params;
  const [video, setVideo] = useState({});
  const [videodate, setVideoDate] = useState<string>('')
  
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [text, onChangeText] = React.useState('')
  const [height, setHeight] = useState(40); // Initial height
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentLength, setCommentLength] = useState<number>();
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


const fecthComment = async (videoID: string, pageNum=1, refresh = true)=>{
  try{
    const response = await fetch(`https://wh-webapp-backend.onrender.com/api/comments/videoComments?q=${videoID}`, 
     {method: 'GET', // Specify the method
      headers: {
        'Content-Type': 'application/json', // Inform the server the body is JSON
      }
  });
const data = await response.json();

    setComments(data)
    setCommentLength(data.length)
    
    if(!response.ok) throw new Error(data.message || "Failed to fetch comments");

    } catch (error) {
      console.log("Error fetching comments", error);
    } 
  };
    useEffect(() => {
    fecthComment(videoID,1,true);
  }, []);

const renderItem = ({ item }: ItemProps) => (
  
      <View>
      <View style={styles.commentItem}>
      <View>
      <Image style = {{ position: "relative", width: 38, height: 38, borderRadius: 50, overflow: 'hidden', borderWidth: 1.5, borderColor: "lightgrey", marginRight: 5, top: 2}}
                         source={item.picture}></Image>
      </View>

      <View style={{flex: 1, flexDirection: "column"}}>
      <Text style={styles.commentBy}>{item.username} {'\u00B7'}{getRelativeTime(item.createdAt)}</Text>
      <Text style={styles.commentText}>{item.comment}</Text>
      </View>


      </View>
      </View>
    
)

    useEffect(()=>{
      setIsLoading(true)
        const fetchData = async () => { 
            try{
                const videoRes = await fetch(`https://wh-webapp-backend.onrender.com/api/videos/find/${id}`,{
                  mode: 'cors'
                })
                const video = await videoRes.json();
                setVideo(video)
                setVideoDate(video.date)
                console.log('video date is', video.date)
            }catch(err){}
        }
        fetchData()
        setIsLoading(false)

     
     }, [])

  const stringID = JSON.stringify(videoID)

  const [playing, setPlaying] = useState(false);


const postComment = async (user) => {
    if (user == null){
window.alert(
'User not found, please log in or sign up to comment'
)
}
   else{

  try {
    const response = await fetch('https://wh-webapp-backend.onrender.com/api/comments/', {
      method: 'POST', // Specify the method
      headers: {
        'Content-Type': 'application/json', // Inform the server the body is JSON
      },
      body: 
        JSON.stringify({ // Convert the JavaScript object to a JSON string
        username: user.username,
        videoID: `${videoID|| "null"}`,
        comment:`${text || "null"}`,
        picture: user.picture,
        createdAt: `${new Date().toISOString()}`,
      }),
    });

    if (!response.ok) {
      // Handle non-successful HTTP statuses
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data1 = await response.json(); // Parse the JSON response
    const newList = [data1, ...comments]
    setComments(newList)
    setCommentLength(newList.length)
    ;
   
   
  } catch (error) {
    console.error('Error:', error);
  }  
  }
};
const handlePress = () => {

    postComment() // Function to execute on press
    onChangeText('')
    fecthComment(videoID,1,true)
  };



// const renderIframe = ({video}: VideoProps) => (
//     <View>
//     <View style={styles.videoContainer}>
  
//   <iframe src= {video.videoUrl} width="auto" height= "225" frameBorder="0"
//   allowFullscreen= "true" 
//   webkitallowfullscreen="true" 
//   mozallowfullscreen="true"></iframe>
  
//       </View>
//     <Text style={styles.title}>{video.title}</Text>
//     <View>
//     <Text style={styles.info}> {video.channelT} {'\u0387'}</Text>
//     </View>
// </View>
// )

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

const altFrame = 
  ["68ad21d09adff8066264a158",
"68ad21d09adff8066264a146",
"68ad21d09adff8066264a14c",
"692b635198f185de3613cdc8",
"693f4aadf196ebd2df8e79e8",
"693f4aadf196ebd2df8e79e5",
"693f4aadf196ebd2df8e79eb",
"68ad21d09adff8066264a152",
"68ad21d09adff8066264a14f",
"69765a7f819d1526d389d0de"]

if (altFrame.includes(id))
  {
  return(

<ScrollView style={styles.container}>
<KeyboardAvoidingView
behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={insets.top + 10}>
      
      <SafeAreaView
      style={{ flex: 1, backgroundColor:"black" }}>

  <View>
    <View style={styles.videoContainer}>
  
  <iframe src= {video.videoUrl} width="auto" height= "225" frameBorder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
  
      </View>
    <Text style={styles.title}>{video.title}</Text>
    <View>
    <Text style={styles.info}> {video.channelT} {'\u0387'} {getRelativeTime(relativedate)}</Text>
    </View>
</View>


<View style={styles.commentContainer}>
<View style={ {position: "relative", left: 0, paddingTop: 5, paddingBottom: 5, alignSelf: "center",}}>
<Text style={{fontWeight: "bold"}}>
  Comments ({commentLength}) 
</Text>
</View>
<View style={styles.comments}>
        <FlatList 
        data ={comments}
        bounces={false}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} 
        
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fecthComment(videoID,1,true)}
            
          />
        }
        ListEmptyComponent={
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: 'gray' }}>Be the first to comment</Text>
        </View>
      }
        />    

</View>


<View
        style={{
   flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    // borderWidth: 2,
    marginBottom: 5
        }}
      >
  <Image style = {{ position: "relative", width: 40, height: 40, borderRadius: 50, overflow: 'hidden', borderWidth: 1.5, borderColor: "lightgrey", marginRight: 5, marginLeft: 5, top: 2}}
                         source={user.picture}></Image>
  <View style={{width:"100%", flex:1, justifyContent: "center"}}>
 <TextInput
          style={[styles.input, { height: Math.min(100, height) }]}
          onChangeText={onChangeText}
          multiline={true}
          keyboardAppearance="dark"
          onContentSizeChange={(event) => {
          // Dynamically adjust height
          setHeight(event.nativeEvent.contentSize.height);
        }}
          placeholder='Add a comment ...'
          value={(text)}
        />
 <Pressable
        style={styles.uploadButton} 
        onPress={() => handlePress()}
      >
        <Text style={styles.buttonText}>Upload</Text>
  </Pressable>
   
 
  </View>
</View>


</View>
<StatusBar translucent={true}></StatusBar>
</SafeAreaView>

</KeyboardAvoidingView>
</ScrollView>


)
} else {
return (

  
  
<ScrollView style={styles.container}>
<KeyboardAvoidingView
behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={insets.top + 10}>
      
      <SafeAreaView
      style={{ flex: 1, backgroundColor:"black" }}>

  <View>
    <View style={styles.videoContainer}>
      <YoutubePlayer
        viewConainterStyle = {true}
        width = {'auto'}
        height = {225}
        play={playing}
        videoId={`${videoID}`}
        onChangeState={onStateChange}
        enablejsapi= {1}
      />
      </View>
    <Text style={styles.title}>{video.title}</Text>
    <View>
    <Text style={styles.info}> {video.channelT} {'\u0387'} {video.viewString} views {'\u0387'} {getRelativeTime(relativedate)} </Text>
    </View>
</View>


<View style={styles.commentContainer}>
<View style={ {position: "relative", left: 0, paddingTop: 5, paddingBottom: 5, alignSelf: "center",}}>
<Text style={{fontWeight: "bold"}}>
  Comments ({commentLength}) 
</Text>
</View>
<View style={styles.comments}>
        <FlatList 
        data ={comments}
        bounces={false}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fecthComment(videoID,1,true)}
            
          />
        }
                ListEmptyComponent={
        <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{ color: 'gray' }}>Be the first to comment!</Text>
        </View>
      }
        />    

</View>


<View
        style={{
   flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    // borderWidth: 2,
    marginBottom: 5
        }}
      >
  <Image style = {{ position: "relative", width: 40, height: 40, borderRadius: 50, overflow: 'hidden', borderWidth: 1.5, borderColor: "lightgrey", marginRight: 5, marginLeft: 5, top: 2}}
                         source={user.picture}></Image>
  <View style={{width:"100%", flex:1, justifyContent: "center"}}>
 <TextInput
          style={[styles.input, { height: Math.min(100, height) }]}
          onChangeText={onChangeText}
          multiline={true}
          keyboardAppearance="dark"
          onContentSizeChange={(event) => {
          // Dynamically adjust height
          setHeight(event.nativeEvent.contentSize.height);
        }}
          placeholder='Add a comment ...'
          value={(text)}
        />
 <Pressable
        style={styles.uploadButton} 
        onPress={() => handlePress()}
      >
        <Text style={styles.buttonText}>Upload</Text>
  </Pressable>
   
 
  </View>
</View>


</View>
<StatusBar translucent={true}></StatusBar>
</SafeAreaView>

</KeyboardAvoidingView>
</ScrollView>

  );
}}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    overflowY: "hidden",
    // alignItems: 'center',
    // justifyContent: 'center',

    flex: 1
  },
    videoContainer: {
    flex: 1,
    marginTop: 5,
    paddingTop: 2,
    position: "relative",
    backgroundColor: '#000000',
    overflowY: "hidden",
    borderRadius: 5,
    top: 0,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    left: 0,
    padding: 3,
    paddingTop: 10,
    position: "relative",
    height: "auto",
  },

info: {
position: "relative",
left: 0,
fontSize: 14,
color: "gray",
flex: 2
},
comments:{
  position: "relative",
  flex: 1,
    // flexWrap: "nowrap",
  flexDirection:"column",
  // borderWidth: 1,
  // borderColor: "#0c4870",
  // borderTopLeftRadius: 20,
  // borderTopRightRadius: 20,
  marginBottom: 0,
  // alignItems: "center",
  width: "100%",
  height: "60%",
  // maxHeight: "70%",
  // maxHeight: "100%",
  justifyContent: "center",
  overflowY: "auto",
  padding: 0,
  zIndex: 100,
  // borderColor: "red",
  // borderWidth: 2,
},


input: {
    position: "relative", 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 10, // Necessary for multiline alignment
    paddingBottom: 10,
    fontSize: 16,
    width: "99%",
    marginBottom: 0,
    marginTop: 4,
    backgroundColor: "lightgrey",
    marginRight: 10
    // marginTop: 10
  },

  commentItem: {
    padding: 10,
    width: "100%",
    overflowY: "visible",
    borderBottomWidth: 1,
    backgroundColor: "#36454F",
    borderRadius: 10,
    marginBottom: 1,
    flex: 1,
    flexDirection: "row"

  },
  commentBy: {
    fontWeight: 'bold',
  },
  commentText: {
    marginTop: 5,
    height: "100%"
  },

   safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1, //removed paddingBottom from here.
  },
keyboardAvoidingView: 
{ flexGrow: 1,
  overflowY: "visible",
 },
uploadButton: {
    padding: 5,
    backgroundColor: '#007AFF',
    borderRadius: 10,
   
    position: 'absolute',
    // alignSelf: 'center',
    right: 8,
    bottom: 8,
    zIndex: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
commentContainer: {
  position: "relative",
  // flex: 1,
  // flexGrow: 1,
  flexWrap: "wrap",
  flexDirection: "column",
  // borderWidth: 1,
  backgroundColor: "#242e35",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  // alignItems: "center",
  width: "100%",
  height: 250,
  // maxHeight: "22%",
  marginTop: "2.5%",
  // justifyContent: "center",
  overflowY: "hidden",
  // borderColor: "red",
  // borderWidth: 2,
  padding: 0,
  zIndex: 100,
  
}
  
});
