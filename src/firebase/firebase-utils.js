import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlgcSFXk0KKe7zUPy2TU34GyXn1jyXp64",
  authDomain: "wwf-blog.firebaseapp.com",
  projectId: "wwf-blog",
  storageBucket: "wwf-blog.appspot.com",
  messagingSenderId: "785735803966",
  appId: "1:785735803966:web:1de416af3ed64f6ee7dd6f",
  measurementId: "G-9QRV1GTH53"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export const storeEmployerMessage = async (name, email, message) => {
  try {
    const createAt = new Date()
    const employerMessageRef = firestore.doc(`employer-messages/${createAt}_${name}`)
    await employerMessageRef.set(
      {
          name,
          email,
          message,
          time: createAt,
      }
    )
    return true
  } catch (error) {
    console.log('Error when saving employer message to firebase')
    return false
  }
}

//google authentication won't provide user name
export const fetchUserInfo = (uid) => {
  const userRef = firestore.doc(`users/${uid}`)

  return userRef.get()
  .then(userDoc => userDoc.data())
}

export const storePost = async(title, summary, paragraph, author, posterImgUrl, userID) => {
  const createAt = new Date()
  const postsSummariesCollectionRef = firestore.collection(`postsAbstract/`)
  
  postsSummariesCollectionRef.orderBy('id', 'desc').limit(1).get()
    .then(lastData => {
      return lastData.docs[0].data().id
    })
    .then(async (lastId) => {
      const postAbstractRef = firestore.doc(`postsAbstract/${lastId+1}`)
      await postAbstractRef.set(
        {
          id: lastId + 1,
          title,
          summary,
          time: createAt,
          author,
          posterImgUrl,
        }
      )
      .then(async() => {
        const postRef = firestore.doc(`posts/${lastId+1}`)
        await postRef.set(
          {
              id: lastId + 1,
              title,
              content: paragraph,
          }
        )
      })
      .then(async () => {
        await addBlogToUserAccount(userID, (lastId + 1))
      })
    })
  .catch((e) => {
    // TODO:发生失败时数据库两个均需回退，也即删除已创建的某一部分数据
    console.log('Error when saving post to firebase=>')
    console.log(e)
    return false
  })
  return true
}

//Get the next linesToReadCount lines of summary data start at startAt id
export const fetchNextTenPostsSummaries = (startAt, linesToReadCount) => {
  const postsSummariesCollectionRef = firestore.collection(`postsAbstract/`)

  return postsSummariesCollectionRef.orderBy('id', 'asc').startAt(startAt).limit(linesToReadCount).get()
  .then(data => data.docs.map(doc => doc.data()))
}

export const fetchPost = (id) => {
  const postRef = firestore.doc(`posts/${id}`)

  return postRef.get()
  .then(postdoc => postdoc.data())
}

export const fetchPostSummary = (id) => {
  const postSummaryRef = firestore.doc(`postsAbstract/${id}`)

  return postSummaryRef.get()
  .then(postdoc => postdoc.data())
}

export const addBlogToUserAccount = (userID, blogID) => {
  const userAccountRef = firestore.doc(`users/${userID}`)
  
  return userAccountRef.get().then(data => data.data()['blogs'])
    .then(preBlogs => [...preBlogs, blogID])
    .then(updatedBlogs => userAccountRef.update('blogs', updatedBlogs))
    .catch(e => {
      console.log('Error when trying to save the post to your account.')
      console.log(e);
    })
} 

export const storeUser = async (uid, displayName, email, createAt, blogs) => {
  const userRef = firestore.doc(`users/${uid}`)
  const userSnapshot = await userRef.get()
  

  if(!userSnapshot.exists) {
    return userRef.set({
      uid,
      displayName,
      email,
      createAt,
      blogs,
    })
    .catch((e) => {
      console.log("Error when saving google login users' info")
      console.log(e)
    })
  }
}

//For image upload
const storage = getStorage();

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

export const deletePost = (postID, userID) => {
  const postRef = firestore.doc(`posts/${postID}`)
  const postAbstractRef = firestore.doc(`postsAbstract/${postID}`)

  return postRef.delete()
  .then(() => {
    postAbstractRef.delete()
    .then(() => deletePostBelongingOnUserAccount(postID, userID))
  })
}

const deletePostBelongingOnUserAccount = (postID, userID) => {
  const userRef = firestore.doc(`users/${userID}`)

  userRef.get()
  .then(res => res.data()['blogs'])
  .then(userBlogs => userBlogs.filter(userBlog => userBlog !== postID))
  .then(updatedUserBlog => userRef.update('blogs', updatedUserBlog))
}

export const uploadImg = (filename, file) => {
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'images/' + filename);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  return new Promise((resolve, reject) => {
    // Listen for state changes, errors, and completion of the upload.  
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          reject("User doesn't have permission to access the object when uploading img")
          break;
        case 'storage/canceled':
          // User canceled the upload
          reject("User canceled the upload when uploading img")
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          reject("Unknown error occurred when uploading img")
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
      });
    }
  );})
  .catch(error => {
    console.log(error)
  })
}
