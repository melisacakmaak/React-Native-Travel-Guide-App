import firebase from 'firebase/app'
import 'firebase/auth'


//log out
export const logoutUser = () => {
  firebase.auth().signOut()
}


//signUp User
export const signUpUser = async ({ name,email, password,photo }) => {
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      firebase.auth().currentUser.updateProfile({
        displayName: name,
        
      })
      //console.log(user);
    return { user }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

//login User
export const loginUser = async ({ email, password }) => {
  try {

    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    return { user }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

//send Email With Password(forget password)
export const sendEmailWithPassword = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email)
    return {}
  } catch (error) {
    return {
      error: error.message,
    }
  }
}



