import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db, auth } from '../firebase'; // make sure to import auth
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // import updateDoc
import Modal from 'react-modal'; // import Modal
import { imgDb } from '../firebase'; // import imgDb
import { ref } from 'firebase/storage';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import { update } from 'firebase/database';
import { updateProfile } from 'firebase/auth';

const Profile = (props) => {
  const params = useParams();
  const { username } = params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false); // state for modal
  const [newData, setNewData] = useState({}); // state for new user data
  const [img, setImg] = useState(null); // state for image

  const currentUser = auth.currentUser;
  console.log(currentUser) // get the currently signed-in user

  const handleToast = () => {
    toast.success("Success Notification !", {});
  }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const logOutUser = async () => {
    await auth.signOut(); // use signOut() function to log out the user
    props.setUserdata.setIsLoggedIn(false);
    props.setUserdata.setToken('');
  }

  const handleTheme = () => {
    props.themeTools.setTheme(props.themeTools.theme === 'dark' ? 'light' : 'dark');
    toast.success(`Theme Changed to ${props.themeTools.theme}!`, {});
  }

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
  }

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
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div><h1>404</h1><h2>User Not Found</h2></div>;
  if (userData) console.log(userData);
  return (
    <div>
      hey {userData.username}
      your full name = {userData.fullname}
      your email = {userData.email}
      your bio = {userData.bio} 
      <button onClick={handleToast}> Click Me </button>
      <button onClick={handleTheme}>Toggle Theme</button>
      {currentUser && <button onClick={logOutUser}>Log Out</button>}
      {currentUser && currentUser.uid === userData.uid && (
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