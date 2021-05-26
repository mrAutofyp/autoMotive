import firebase from "../../config/firebase";

const check_current_user = () => {
    return (dispatch) => {
        // console.log("getting Current User")
        var user = firebase.auth().currentUser;
        if (user) {

            let dbRef = firebase.database().ref("users");
            dbRef.child(user.uid).get().then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch({ type: "currentUser", payload: snapshot.val() });
                    // console.log(snapshot.val());
                }
            })
        }

        firebase.auth().onAuthStateChanged(function(user) {
            // console.log(user)
            if (user) {
                let dbRef = firebase.database().ref("users");
                dbRef.child(user.uid).get().then((snapshot) => {
                    if (snapshot.exists()) {
                        dispatch({ type: "currentUser", payload: snapshot.val() });
                        // console.log(snapshot.val());
                    }
                })

            } else {
                dispatch({ type: "currentUser", payload: {} });
            }

        })
    }
}

const get_All_Products = () => {
    let productsList = [];
    console.log()
    return (dispatch) => {
        firebase.database().ref('all_Products').on('child_added', (data) => {
            productsList.push(data.val().prod);
            dispatch({ type: "get_All_Products", payload: productsList })
        });
    }
};

const Emailsignup = (email, password, userName) => {
    return (dispatch) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                var user = result.user;
                let chkAdmin = user.uid === "fBiZB4exbQXbGzMKzf1J1V1G2Cl2" ? true : false;
                let create_user = {
                    userName: userName,
                    userEmail: user.email,
                    userUid: user.uid,
                    userProfile: "",
                    admin: chkAdmin,
                    address: "",
                    phone: ""
                }
                firebase.database().ref('/').child(`users/${user.uid}`).set(create_user)
                    .then(() => {
                        alert(`${user.displayName}, login Successfully!`)
                    }).catch(function(error) {
                        alert("Some Error Occurred While adding user to database" + error.message)
                    })
                user.updateProfile({
                    displayName: userName,
                })
            }).catch((error) => {
                console.log(error.message);
                alert(error.message)
            });

    }
}

const facebooklogin = () => {
    return (dispatch) => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {

            var user = result.user;
            let chkAdmin = user.uid === "fBiZB4exbQXbGzMKzf1J1V1G2Cl2" ? true : false;

            let dbRef = firebase.database().ref("users");
            dbRef
                .child(user.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        return true;
                    } else {
                        console.log("else running");
                        let create_user = {
                            userName: user.displayName,
                            address: "",
                            userEmail: user.email,
                            userProfile: result.user.photoURL,
                            phone: "",
                            admin: chkAdmin,
                            userUid: user.uid,
                            phone: ""
                        }
                        firebase.database().ref('/').child(`users/${user.uid}`).set(create_user)
                            .then(() => {
                                alert(`${user.displayName}, login Successfully!`)
                            }).catch(function(error) {
                                alert("Some Error Occurred While adding user to database" + error.message)
                            })
                    }
                })
        }).catch(function(error) {
            alert(error.message)
        });
    }
}

const googleLogin = () => {
    return (dispatch) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {

                var user = result.user;
                let chkAdmin = user.uid === "fBiZB4exbQXbGzMKzf1J1V1G2Cl2" ? true : false;

                let dbRef = firebase.database().ref("users");
                dbRef
                    .child(user.uid)
                    .get()
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            return true;
                        } else {
                            console.log("else running");
                            let create_user = {
                                userName: user.displayName,
                                address: "",
                                userEmail: user.email,
                                userProfile: result.user.photoURL,
                                phone: "",
                                admin: chkAdmin,
                                userUid: user.uid,
                                phone: ""
                            }
                            firebase.database().ref('/').child(`users/${user.uid}`).set(create_user)
                                .then(() => {
                                    alert(`${user.displayName}, login Successfully!`)
                                }).catch(function(error) {
                                    alert("Some Error Occurred While adding user to database" + error.message)
                                })
                        }
                    })
            }).catch((error) => {
                alert(error.message)
            });
    }
}

const closeSuccessMsg = () => {
    return (dispatch) => {
        dispatch({ type: "closeSuccessMsg", payload: false })
        console.log("jjj")
    }
}

const openSuccessMsg = () => {
    return (dispatch) => {
        dispatch({ type: "closeSuccessMsg", payload: true })
    }
}

// const setData = () => {
//     let key = firebase.database().ref("All_Ads").push().key;
//     let prod = {
//       brand: "Service",
//       description:
//         "Popular Mechanics A Guide To Upgrading Wheels and Tires | The Best Wheels",
//       img:
//         "data:image/jpeg;base64,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",
//       price: 2000,
//       key: key,
//       title: "car wheel",
//     };
//     firebase.database().ref("all_Products").child(key).set(prod);
//   };

export { get_All_Products, Emailsignup, facebooklogin, googleLogin, check_current_user, closeSuccessMsg, openSuccessMsg };