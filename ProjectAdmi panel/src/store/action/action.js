import ActionTypes from '../constant/constant';
import history from '../../History';
import firebase from 'firebase';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCcRM1BZhqvyTsBiQHEar_S07T03h_VOL0",
    authDomain: "fir-588c0.firebaseapp.com",
    databaseURL: "https://fir-588c0.firebaseio.com",
    projectId: "fir-588c0",
    storageBucket: "fir-588c0.appspot.com",
    messagingSenderId: "289884235023"
};
firebase.initializeApp(config);



export function signinAction(user) {
    return dispatch => {
        console.log('user in signin', user);
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((studentsignedinUser) => {
                let userid = studentsignedinUser.uid
                console.log(userid)
                firebase.database().ref(`admin/${userid}`).once('value')
                    .then((userData) => {
                        console.log(userData.val())
                        if (userData.val() === null) {
                            alert("You Enter Wrong Email Or Password")
                            studentsignedinUser.delete()
                            history.push("/home")
                        } else {
                            setTimeout(() => {
                                history.push('/home');
                            }, 2000)
                        }
                    })
            }).catch((error) => {
                console.log(error.message)
                dispatch({ type: ActionTypes.ERRORSN, payload: error.message });
            })
    }
}


export function donatorsdata() {
    return dispatch => {
        firebase.database().ref(`users/donator/`).on('value', snap => {
            console.log(snap.val())
            let dbdata = snap.val()
            let dataarr = [];
            for (let key in dbdata) {
                dataarr.push(dbdata[key])
            }
            console.log(dataarr)
            dispatch({ type: ActionTypes.DONATORSDATA, payload: dataarr });
        })
    }
}


export function getngosdata() {
    return dispatch => {
        firebase.database().ref(`users/ngo/`).on('value', snap => {
            console.log(snap.val())
            let dbdata = snap.val()
            let dataarr = [];
            for (let key in dbdata) {
                dataarr.push(dbdata[key])
            }
            console.log(dataarr)
            dispatch({ type: ActionTypes.NGOSDATA, payload: dataarr });
        })

    }
}


export function deletebtndonator(uid) {
    return dispatch => {
        console.log(uid)
        firebase.database().ref(`/users/donator/${uid}/`).remove()
    }
}

export function deletebtnngos(uid) {
    return dispatch => {
        console.log(uid)
        firebase.database().ref(`/users/ngo/${uid}/`).remove()
    }
}


export function posts() {
    return dispatch => {
        firebase.database().ref(`/users/ngo/`).on('value', data => {
            // console.log(data.val())
            let dbdata = data.val()
            let dataarr = [];
            let pushkey = [];
            let postarr = [];
            // let donationmoney = []
            for (let key in dbdata) {
                dataarr.push(dbdata[key])
                let post = dbdata[key].post
                for (let key1 in post) {
                    pushkey.push(key1)
                    postarr.push(post[key1])
                    // let donation = (post[key1].donation)
                    // for (let key in donation){
                    // donationmoney.push(donation)
                    // }
                }
            }
            // console.log('getdatapost')
            // console.log(dataarr)
            console.log(postarr)
            // console.log(donationmoney)
            // console.log(pushkey)
            dispatch({ type: ActionTypes.REQUIRMENTPOSTKEYS, payload: pushkey });
            dispatch({ type: ActionTypes.REQUIRMENTPOST, payload: postarr });
        })
    }
}


export function likedata(uid, pushkey) {
    return dispatch => {
        // console.log(uid)
        // console.log(pushkey)
        firebase.database().ref(`/users/ngo/${uid}/post/${pushkey}/likedata/`).once('value')
            .then((data) => {
                let dbdata = data.val()
                console.log(data.val())
                let array = []
                for (let key in dbdata) {
                    array.push(dbdata[key].name)
                    // console.log(dbdata[key].name)
                }
                dispatch({ type: ActionTypes.LIKEDATA, payload: array });
            })
    }
}


export function commentdata(uid, pushkey) {
    return dispatch => {
        firebase.database().ref(`/users/ngo/${uid}/post/${pushkey}/comments/`).on('value', data => {
            let array = []
            let dbdata = data.val()
            for (let key in dbdata) {
                array.push(dbdata[key])
            }
            console.log(array)
            dispatch({ type: ActionTypes.COMMENTDATA, payload: array });
        })
    }
}

export function deletepost(uid, pushkey) {
    return dispatch => {
        console.log(uid)
        console.log(pushkey)
        firebase.database().ref(`/users/ngo/${uid}/post/${pushkey}/`).remove()
    }
}

export function ngosrequest() {
    return dispatch => {
        firebase.database().ref(`/admin/ngorequest/`).on('value', data => {
            let dbdata = data.val()
            console.log(data.val())
            let dataarr = [];
            for (let key in dbdata) {
                dataarr.push(dbdata[key])
            }
            console.log(dataarr)
            dispatch({ type: ActionTypes.NGOSREQUEST, payload: dataarr });
        })
    }
}


export function acceptbtnngos(uid) {
    return dispatch => {
        firebase.database().ref(`/admin/ngorequest/${uid}/`).once('value')
            .then((data) => {
                let dbdata = data.val()
                console.log(dbdata)
                firebase.database().ref(`/users/ngo/${uid}/`).set(dbdata)
                firebase.database().ref(`/admin/ngorequest/${uid}/`).remove()
            })
    }
}


export function ngospostrequest() {
    return dispatch => {
        firebase.database().ref(`/admin/ngospostrequest/`).on('value', data => {
            let dbdata = data.val()
            let array = []
            let keyarray = []
            for (let key in dbdata) {
                console.log(dbdata[key])
                let data = dbdata[key]
                for (let key in data) {
                    keyarray.push(key)
                    array.push(data[key])
                    console.log(array)
                    dispatch({ type: ActionTypes.NGOPOSTREQ, payload: array });
                    dispatch({ type: ActionTypes.NGOPOSTREQKEY, payload: keyarray });
                }
            }
        })
    }
}


export function ngospostrequestaccpt(uid, key) {
    return dispatch => {
        firebase.database().ref(`/admin/ngospostrequest/${uid}/${key}/`).once('value')
            .then((data) => {
                let dbdata = data.val()
                console.log(dbdata)
                firebase.database().ref(`/users/ngo/${uid}/post/`).push(dbdata)
                firebase.database().ref(`/notification/${uid}/`).set({ name: dbdata.name })
                setTimeout(function () {
                    firebase.database().ref(`/notification/${uid}/`).remove()
                }, 100);
                firebase.database().ref(`/admin/ngospostrequest/${uid}/${key}/`).remove()
            })
    }
}



export function signout() {
    return dispatch => {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            history.push('/')
            localStorage.clear()
        }).catch(function (error) {
            // An error happened.
            alert(error.msg)
        });
    }
}
