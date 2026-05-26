// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  StorageReference,
  listAll,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";


let Images = []

var firebaseConfig = {
  apiKey: "AIzaSyC7r43Nq1OTwyJR8hT_wa9F9xc2dwWskSk",
  authDomain: "watch-haiti.firebaseapp.com",
  projectId: "watch-haiti",
  storageBucket: "watch-haiti.firebasestorage.app",
  messagingSenderId: "93788970597",
  appId: "1:93788970597:web:cda7da30db53fd71bc708c"
};

// Initialize Firebase
const firestoreApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
const storage = getStorage();
console.log("Connected to firebase")




export interface ImagesType {
  photoURL: string;
};

interface locationProps{
  bucket: string;
  path: string;
}

interface ItemsRefType {
  _location: locationProps[];

}


// export async function getDownloadUrlsFromFolder() {
// // Create a reference under which you want to list
// const listRef = ref(storage, "/");

// try{
// // Find all the prefixes and items.
// const listResults = await listAll(listRef);
//     const items = listResults.items;
    
//     // Use Promise.all to wait for all download URL promises to resolve
//       const downloadUrls = items.map((itemRef) => { 
//       return getDownloadURL(itemRef)
//       });
//       console.log(downloadUrls)
//       const downloadUrlsArray = await Promise.all(downloadUrls);

//       return downloadUrlsArray;

// } catch(error) {
//     // Uh-oh, an error occurred!
//     throw error;
//   };
// }


// async function finishedData(){

//   try {
//     // Await the function call to get the actual data
//     const allData = await getDownloadUrlsFromFolder();
//     console.log(allData)
//     return allData
    
//     // Use the data here
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// finishedData()




  
export default { firestoreApp, googleProvider, auth, storage};