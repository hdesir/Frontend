
import {
  StorageReference,
  listAll,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { getStorage} from "firebase/storage";

export default interface ImagesType {
  photoURL: string;
};


