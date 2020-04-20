import * as firebase from 'firebase';
import UserFirebaseApi from './UserFirebaseApi';

// Firebase methods for working with user authentication...
export default class AuthFirebaseApi {

    // Signs current user out...
    static signOut() {
      return firebase.auth().signOut();
    }
  
    // Signs user in with email and password...
    static signInWithEmailAndPassword(email, password) {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    }
  
    // Sends a password reset email...
    static sendPasswordResetEmail(email) {
      return firebase.auth().sendPasswordResetEmail(email);
    }
  
    // Creates a user with the given email/password. If sendEmailVerification = true, will send an email verification email
    static createUserWithEmailAndPassword(email, password, sendEmailVerification) {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
            var p = UserFirebaseApi.updateUserData(user.uid, { email: email });
            if (!sendEmailVerification) { return p; }
  
            // Send the email verification...
            return p.then(function() { return user.sendEmailVerification(); });
        });
    }
  
    // Returns a promise that allows firebase.auth() to initialize. Good for things that want to wait for the logged in user.
    static getAuthInitializePromise() {
      // Copied from AngularFire: https://github.com/firebase/angularfire/blob/master/src/auth/FirebaseAuth.js (see _initAuthResolver)
      // Calls onAuthStateChanged once and then turns it off.
      return new Promise(function(resolve, reject) {
        var off;
        function cb(user) { off(); resolve(user); }
        off = firebase.auth().onAuthStateChanged(cb);
      });
    }
  
    // Deletes the currently logged in user (if there is one)...
    static deleteCurrentUser() {
        var currentUser = firebase.auth().currentUser;
        if (!currentUser) { return Promise.reject("There is no current user"); }
  
        return firebase.auth().currentUser.delete().then(function() {
            return UserFirebaseApi.clearUserData(currentUser.uid);
        });
    }
  
    // Changes the current user's email address...
    static changeCurrentUserEmail(currentPassword, newEmail) {
        return AuthFirebaseApi.reauthenticateCurrentUser(currentPassword).then(function() {
           return firebase.auth().currentUser.updateEmail(newEmail).then(function() {
               return UserFirebaseApi.updateUserData(firebase.auth().currentUser.uid, { email: newEmail });
           });
        });
    }
  
    // Changes the current user's password...
    static changeCurrentUserPassword(currentPassword, newPassword) {
        return AuthFirebaseApi.reauthenticateCurrentUser(currentPassword).then(function() {
           return firebase.auth().currentUser.updatePassword(newPassword);
        });
    }
  
    // Returns true if a user is logged in...
    static isUserLoggedIn() {
      return (firebase.auth().currentUser);
    }
  
    // Returns the currentUser
    static getCurrentUser() {
      return firebase.auth().currentUser;
    }
  
    // Returns the current user's UID (or null if there isn't one)
    static getCurrentUserID() {
      var user = firebase.auth().currentUser;
      return (user) ? user.uid : null;
    }
  
     // Returns true if the current user is authenticated via email/password...
    static isCurrentUserPasswordAuthenticated() {
      var currentUser = firebase.auth().currentUser;
      if (!currentUser) { return false; }
  
      var providerData = currentUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === "password") {
          return true;
        }
      }
      return false;
    }
  
    // Reauthenticates current user (only works if password-authenticated). Returns a promise => p.then(function(){ }).catch(function(error){ });
    static reauthenticateCurrentUser(password) {
      var currentUser = AuthFirebaseApi.getCurrentUser();
      var credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, password);
      return currentUser.reauthenticateWithCredential(credential);
    }
  }