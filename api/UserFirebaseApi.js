import * as firebase from 'firebase';

// Firebase methods for working with /users data...
export default class UserFirebaseApi {
    // Returns a promise that returns the given user's data, ONE TIME.
    static getUserData(userID) {
      return firebase.database().ref("users").child(userID).once("value");
    }
  
    // Calls success(snapshot) every time the given user updates
    static watchUserData(userID, success, failure) {
      return firebase.database().ref("users").child(userID).on("value", success, failure);
    }

    // Stops watching user data with the given callback. <success> should be the same <success> function in watchUserData()
    static stopWatchingUserData(userID, success) {
      return firebase.database().ref("users").child(userID).off("value", success);
    }
  
    // Updates the given user with the given data. If you want to delete a property, add it to data with a value of null.
    static updateUserData(userID, data) {  
      // Add each property individually so we don't overwrite any data...
      var paths = {};
      Object.keys(data).forEach(function(dataKey) {
         paths["users/" + userID + "/" + dataKey] = data[dataKey];
      });
  
      // Perform the update...
      return firebase.database().ref().update(paths);
    }
  
    // Clears out all user data from the database (but not things like views/likes/etc. in other memories)
    static clearUserData(userID) {
        var paths = {};
        paths["users/" + userID] = null;
        return firebase.database().ref().update(paths);
    }
  
    //
    // QUERY METHODS
    //
  
    // Returns a promise when ALL data for the array of users has been retrieved. (Use for followers/following, etc.)
    static getListOfUsers(arrUserIDs, userDataSuccess, userDataFailure) {
      var promises = arrUserIDs.map(function(userID) {
        return firebase.database().ref("users").child(userID)
          .on("value", userDataSuccess, userDataFailure);
      });
  
      return Promise.all(promises);
    }
  }