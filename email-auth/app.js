function handelSignUp(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if(email.length < 4){
        alert('Please Enter Your Email !');
        return;
    }
    if(password.length < 4){
        alert('Please Enter Your Password !');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == 'auth/weak-password'){
            alert('The password is too weak.');
        }else{
            alert(errorMessage);
        }
        console.log(error);
    });
}

function toggleSignIn(){
    if(firebase.auth().currentUser){
        firebase.auth().signOut();
    }else{
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if(email.length < 4){
            alert('Please Enter Your Email !');
            return;
        }
        if(password.length < 4){
            alert('Please Enter Your Password !');
            return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode == 'auth/wrong-password'){
                alert('The password is too weak.');
            }else{
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('signin').disabled = false;
        });
    }
    document.getElementById('signin').disabled = true;
}

function senmailVerify(){
    firebase.auth().currentUser.sendEmailVerification().then(()=>{
        alert('Email Verification Sent !!');
    });
}

function sendmailResetPassword(){
    const email = document.getElementById('email').value;
    firebase.auth().sendPasswordResetEmail(email).then(()=>{
        alert('Password Reset Email Sent!');
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == 'auth/invalid-email'){
            alert(errorMessage);
        }else if(errorCode == 'auth/user-not-found'){
            alert(errorMessage);
        }
        console.log(error);
    });
}

function initApp(){
    firebase.auth().onAuthStateChanged((user) => {
        document.getElementById('verifyemail').disabled = true;
        if(user){
            const displayname = user.displayname;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            const isAnonymous = user.isAnonymous;
            const uid = user.uid;
            const providerData = user.providerData;

            document.getElementById('signinstatus').textContent = 'Signed in';
            document.getElementById('signin').textContent = 'Sign out';
            document.getElementById('accountdetail').textContent = JSON.stringify(user, null, '  ');
            if(!emailVerified){
                document.getElementById('verifyemail').disabled = false;
            }
        }else{
            document.getElementById('signinstatus').textContent = 'Sign out';
            document.getElementById('signin').textContent = 'Sign in';
            document.getElementById('accountdetail').textContent = null;
        }
        document.getElementById('signin').disabled = false;
    })
}

window.onload = function(){
    initApp();
}