import React, { useEffect, useState } from 'react'; // import { useEffect, useState }
import { useParams } from 'react-router-dom'; // import useParams
import { toast } from 'react-toastify'; // import toast
import 'react-toastify/dist/ReactToastify.css'; // import css for toastify
import { db, auth } from '../firebase'; // make sure to import auth
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // import updateDoc
import Modal from 'react-modal'; // import Modal
import { imgDb } from '../firebase'; // import imgDb
import { ref } from 'firebase/storage'; // import ref
import { uploadBytes, getDownloadURL } from 'firebase/storage'; // import uploadBytes and getDownloadURL
import { updateProfile } from 'firebase/auth'; // import updateProfile
import LoadingPage from './LoadingPage'; // import LoadingPage


const Profile = (props) => {
  const params = useParams(); // get the URL parameters
  const { username } = params; // get the username from the URL
  const [userData, setUserData] = useState(null); // state for user data
  const [loading, setLoading] = useState(true); // state for loading
  const [error, setError] = useState(false); // state for error
  const [modalIsOpen, setModalIsOpen] = useState(false); // state for modal
  const [newData, setNewData] = useState({}); // state for new user data
  const [img, setImg] = useState(null); // state for image
  const currentUser = auth.currentUser; // get the current user

  const handleToast = () => {
    toast.success("Success Notification !", {});
  } // function to handle toast notification

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  }; // function to handle image change and store its data to a set to use it later

  const logOutUser = async () => {
    await auth.signOut(); // use signOut() function to log out the user
    props.setUserdata.setIsLoggedIn(false);
    props.setUserdata.setToken('');
  } // function to log out the user

  const handleTheme = () => {
    props.themeTools.setTheme(props.themeTools.theme === 'dark' ? 'light' : 'dark');
    toast.success(`Theme Changed to ${props.themeTools.theme}!`, {});
  } // function to handle theme change

  const handleUpdate = async () => {
    if (currentUser && currentUser.uid === userData.uid) {
      const docRef = doc(db, 'users', username);
      await updateDoc(docRef, newData);
      setModalIsOpen(false); // close the modal after updating
      if (img){
        setLoading(true);
        const storageRef = ref(imgDb, `usersProfiles/${auth.currentUser.uid}/${img.name}`);
        await uploadBytes(storageRef, img);
        const url = await getDownloadURL(storageRef);
        await updateDoc(docRef, { profile_url: url });
        updateProfile(auth.currentUser, { photoURL: url });
        setLoading(false);
      }
    } else {
      console.log('You do not have permission to edit this profile');
    }
  } // function to handle update user data we are using updateDoc to update the data and updateProfile to update the profile image inside the auth and storage to store images from usestate img. 

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'users', username);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        console.log(userData);
      } else {
        console.log('No such document!');
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [username]); // useEffect to fetch the data from the database and set the data to the state

  if (loading) return <LoadingPage /> // if loading is true return LoadingPage
  if (error) return <div><h1>404</h1><h2>User Not Found</h2></div>; // if error is true return 404 User Not Found
  if (userData) 
  return (
    <div>
      hey {userData.username}
      your full name = {userData.fullname}
      your email = {userData.email}
      your bio = {userData.bio} 
      <button onClick={handleToast}> Click Me </button>
      <button onClick={handleTheme}>Toggle Theme</button>
      {currentUser && <button onClick={logOutUser}>Log Out</button>}
      {currentUser && currentUser.uid === username && (
        <>
          <button onClick={() => setModalIsOpen(true)}>Update Profile</button>
          <Modal isOpen={modalIsOpen}>
            <h2>Update Profile</h2>
            <input type="text" placeholder="Full Name" onChange={e => setNewData({...newData, fullname: e.target.value})} />
            <input type="text" placeholder="Email" onChange={e => setNewData({...newData, email: e.target.value})} />
            <input type="text" placeholder="Bio" onChange={e => setNewData({...newData, bio: e.target.value})} />
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpdate}>Submit</button>
            <button onClick={() => setModalIsOpen(false)}>Close</button>
          </Modal>
        </>
      )}
    </div>
  ); 
}

export default Profile;