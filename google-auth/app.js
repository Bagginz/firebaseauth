

function signinGoogle(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken;
        const user = result.user;
        console.log(token);
        console.log(user);
      }).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
}

function logoutGoogle(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('Sign-out successful.');
      }).catch(function(error) {
        // An error happened.
        console.log(error);
      });
}

function initApp(){
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
    })
}

window.onload = function(){
    initApp();
    document.getElementById('signin').onclick = function() {
        signinGoogle();
    }; 
    document.getElementById('logout').onclick = function() {
        logoutGoogle();
    };
}