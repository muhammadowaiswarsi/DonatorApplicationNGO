import ActionTypes from '../constant/constant';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux'; // New code
import { InteractionManager } from 'react-native'




export function SignupNow(data) {
    return dispatch => {
        // InteractionManager.runAfterInteractions(() => {
        // ...long-running synchronous task...

        // console.log(data)
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((user) => {
                // console.log(user)
                console.log(data)
                if (data.donator === true) {
                    dataobj = {
                        email: data.email,
                        username: data.name,
                        uid: user.uid,
                        contact: data.contact,
                        donator: 'donator',
                    }
                    console.log(dataobj)
                    firebase.database().ref(`/users/donator/${user.uid}/`).set(dataobj)
                        .then(() => {
                            console.log(dataobj)
                            Actions.main()
                            console.log(dataobj)
                        })
                } else if (data.ngo === true) {
                    dataobj = {
                        email: data.email,
                        username: data.name,
                        uid: user.uid,
                        contact: data.contact,
                        ngo: 'ngo',
                    }
                    console.log(dataobj)

                    firebase.database().ref(`/admin/ngorequest/${user.uid}/`).set(dataobj)
                        .then(() => {
                            console.log(dataobj)
                            alert('Your request is forward to admin Please wait')
                            Actions.NotLogHome()
                            console.log(dataobj)
                        })
                }
            }).catch((error) => {
                console.log(error.message)
                dispatch({ type: ActionTypes.SIGNUPERROR, payload: error.message });
            });
        // });
    }
}

export function SiginNow(data) {
    return dispatch => {
        // InteractionManager.runAfterInteractions(() => {

        console.log(data)
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((user) => {
                let userid = user.uid
                console.log(userid)
                if (userid) {
                    firebase.database().ref(`users/donator/${userid}/`).once('value')
                        .then((data1) => {
                            console.log(data1.val())
                            let dbdata = data1.val()
                            if (dbdata) {
                                Actions.main()
                                dispatch({ type: ActionTypes.SIGNIN, payload: dbdata });
                            }
                            else {
                                firebase.database().ref(`users/ngo/${userid}/`).once('value')
                                    .then((data2) => {
                                        console.log(data2.val())
                                        let dbdata = data2.val()
                                        if (dbdata) {
                                            Actions.main1()
                                            dispatch({ type: ActionTypes.SIGNIN, payload: dbdata });
                                        } else {
                                            firebase.database().ref(`admin/ngorequest/${userid}/`).once('value')
                                                .then((data3) => {
                                                    console.log(data3.val())
                                                    let dbdata = data3.val()
                                                    if (dbdata) {
                                                        alert('Please Wait Your request is in pending')
                                                        Actions.NotLogHome()
                                                    }
                                                    else {
                                                        alert('user not found')
                                                        user.delete()
                                                    }
                                                })
                                        }
                                    })
                            }
                        }).catch((error) => {
                            console.log(error.message)
                            dispatch({ type: ActionTypes.SIGNINERROR, payload: error.message });
                        })
                }
            }
            )
    }
}



export function LOGIN() {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let uid = user.uid
                console.log(uid)
                firebase.database().ref(`/users/donator/${uid}/`).once('value')
                    .then((snap) => {
                        let dbdata = snap.val()
                        if (dbdata) {
                            Actions.main()
                            dispatch({ type: ActionTypes.SIGNIN, payload: dbdata });
                        } else {
                            Actions.main1()
                            firebase.database().ref(`/users/ngo/${uid}/`).once('value')
                                .then((data) => {
                                    let dbdata1 = data.val()
                                    console.log(dbdata1)
                                    dispatch({ type: ActionTypes.SIGNIN, payload: dbdata1 });
                                })
                        }
                    })
            } else {
                Actions.NotLogHome()
            }
        })
    }
}


export function requirmentdata(req) {
    return dispatch => {

        console.log(req)
        console.log(req.uid)//currentuser

        if (req) {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            let date = new Date();
            let dd = date.getDate().toString();
            let m = date.getMonth() + 1.; //January is 0!
            let mm = monthNames[m];
            let yyyy = date.getFullYear().toString();

            let finalDate = mm + ' ' + dd + ',' + yyyy

            let counter = 0;

            let obj = {
                name: req.username,
                uid: req.uid,
                requirement: req.requirement,
                requirementmoney: req.requirementmoney,
                date: finalDate.toString(),
                likes: counter,
                likedata: '',
                comments: '',
                donation: counter,
            }
            console.log(obj)

            firebase.database().ref(`/admin/ngospostrequest/${req.uid}/`).push(obj)
        }
    }
}




export function ngosdataget() {
    return dispatch => {
        // InteractionManager.runAfterInteractions(() => {

        console.log('dbdata')
        firebase.database().ref(`users/ngo/`).on('value', snap => {
            // console.log(snap.val())
            let dbdata = snap.val()
            let dataarr = [];
            for (let key in dbdata) {
                dataarr.push(dbdata[key])
            }
            // console.log(dataarr)
            dispatch({ type: ActionTypes.NGODATA, payload: dataarr });
        })
        // })
    }
}


export function getusers() {
    return dispatch => {
        // InteractionManager.runAfterInteractions(() => {

        firebase.database().ref(`users/donator/`).on('value', snap => {
            // console.log(snap.val())
            let dbdata = snap.val()
            let dataarr = [];
            for (let key in dbdata) {
                dataarr.push(dbdata[key])
            }
            // console.log(dataarr)
            dispatch({ type: ActionTypes.USERSDATA, payload: dataarr });
        })
        // })
    }
}


export function getdatapost() {
    return dispatch => {
        firebase.database().ref(`/users/ngo/`).on('value', data => {
            let dbdata = data.val()
            let dataarr = [];
            let pushkey = [];
            let postarr = [];
            for (let key in dbdata) {
                dataarr.push(dbdata[key])
                let post = dbdata[key].post
                for (let key1 in post) {
                    pushkey.push(key1)
                    postarr.push(post[key1])
                }
            }
            console.log(postarr)
            console.log(pushkey)
            dispatch({ type: ActionTypes.REQUIRMENTPOSTKEYS, payload: pushkey });
            dispatch({ type: ActionTypes.REQUIRMENTPOST, payload: postarr });
        })
    }
}


export function like(uid, pushkey, name) {
    return dispatch => {
        // InteractionManager.runAfterInteractions(() => {
        console.log(pushkey)
        console.log(uid)
        firebase.auth().onAuthStateChanged((currentuser) => {
            firebase.database().ref(`users/ngo/${uid}/post/${pushkey}/`).once('value')
                .then((data) => {
                    let dbdata = data.val()
                    console.log(dbdata)
                    let like = dbdata.likedata;
                    let bool = false;
                    if (like) {
                        for (let key in like) {
                            if (currentuser.uid === key) {
                                console.log(key)
                                bool = true;
                                break;
                            }
                            // console.log(uid)
                        }
                    }
                    if (bool) {
                        firebase.database().ref(`/users/ngo/${uid}/post/${pushkey}/`).once('value')
                            .then((data1) => {
                                console.log(data1.val())
                                let dbdata = data1.val()
                                let oldlike = dbdata.likes
                                console.log(oldlike)
                                firebase.database().ref(`/users/ngo/${uid}/post/${pushkey}/`).update({ likes: oldlike - 1 })
                                let likedata1 = dbdata.likedata
                                console.log(likedata1)
                                firebase.database().ref(`/users/ngo/${uid}/post/${pushkey}/likedata/${currentuser.uid}`).remove()
                                firebase.database().ref(`/users/ngo/${uid}/post/${pushkey}/${currentuser.uid}`).remove()
                            })
                    } else {
                        firebase.database().ref(`/users/ngo/${uid}/post/${pushkey}/`).once('value')
                            .then((data2) => {
                                console.log(data2.val())
                                let dbdata = data2.val()
                                let oldlike = dbdata.likes
                                console.log(oldlike)
                                let obj = {
                                    name: name,
                                    uid: currentuser.uid
                                }
                                firebase.database().ref(`/users/ngo/${uid}/post/${pushkey}/`).update({ likes: oldlike + 1 })
                                firebase.database().ref(`/users/ngo/${uid}/post/${pushkey}/likedata/${currentuser.uid}`).set(obj)
                                firebase.database().ref(`/users/ngo/${uid}/post/${pushkey}/${currentuser.uid}`).set(obj)
                            })
                    }
                }
                )
        })
        // })
    }
}



// export function likethumbs() {
//     return dispatch => {
//         firebase.database().ref(`/users/ngo/`).on('value', data => {
//             let dbdata = data.val()
//             let dataarr = [];
//             // let pushkey = [];
//             // let postarr = [];
//             for (let key in dbdata) {
//                 dataarr.push(dbdata[key])
//                 let post = dbdata[key].post
//                 for (let key1 in post) {
//                     let postdata = post[key1].likedata
//                     console.log(postdata)
// }
// }
// dispatch({ type: ActionTypes.REQUIRMENTPOST, payload: dataarr });
// })
// }
// }


export function commentcomponent(uid, pushkey) {
    return dispatch => {
        let obj = {
            uid: uid,
            pushkey: pushkey
        }
        dispatch({ type: ActionTypes.POSTCOMMENT, payload: obj });
        firebase.database().ref(`/users/ngo/${uid}/post/${pushkey}/`).on('value', snap => {
            let dbdata = snap.val()
            if (dbdata !== null) {
                console.log(dbdata)
                dispatch({ type: ActionTypes.COMMENTBOX, payload: dbdata });
            } else {
                dispatch({ type: ActionTypes.COMMENTBOX, payload: null });
            }
        })

    }
}


export function commentsend(uid, pushkey, comment, data) {
    return dispatch => {
        let obj = {
            username: data.username,
            comment: comment,
            uid: data.uid,
        }
        firebase.database().ref(`users/ngo/${uid}/post/${pushkey}/comments/`).push(obj)
    }
}


export function getcomments(uid, pushkey) {
    return dispatch => {
        console.log(uid)
        console.log(pushkey)
        firebase.database().ref(`users/ngo/${uid}/post/${pushkey}/comments/`).on('value', data => {
            let dbdata = data.val()
            console.log(dbdata)
            let empty = []
            if (dbdata) {
                let comments = [];
                for (let key in dbdata) {
                    let pushkey = dbdata[key]
                    comments.push(pushkey)
                    dispatch({ type: ActionTypes.COMMENTDATA, payload: comments });
                }
            } else {
                dispatch({ type: ActionTypes.COMMENTDATA, payload: empty });
            }
        })
    }
}


export function dontionmoneyindex(uid, index, requirementmoney, donation) {
    return dispatch => {
        console.log(index)
        let obj = {
            uid: uid,
            index: index,
            requirementmoney: requirementmoney,
            donation: donation
        }
        dispatch({ type: ActionTypes.DONATIONMONEYINDEX, payload: obj });
    }
}


export function donationmoney(uid, pushkey, donation1, currentuser, currentuseruid) {
    return dispatch => {
        console.log(uid)
        console.log(pushkey)
        console.log(donation1)
        console.log(currentuser)
        console.log(currentuseruid)
        let obj = {
            donationAmount: donation1,
            donatorName: currentuser,
            donatorUid: currentuseruid
        }

        firebase.database().ref(`/users/ngo/${uid}/post/${pushkey}/`).once('value')
            .then((data1) => {
                console.log(data1.val())
                let dbdata = data1.val()
                let donation = dbdata.donation
                console.log(donation)
                let finalDonation = Number(donation) + Number(obj.donationAmount)
                firebase.database().ref(`/users/ngo/${uid}/post/${pushkey}/`).update({ donation: finalDonation })

                firebase.database().ref(`users/ngo/${uid}/post/${pushkey}/donationData/`).push(obj)
            })
    }
}


export function logOutNow() {
    return dispatch => {
        // InteractionManager.runAfterInteractions(() => {

        firebase.auth().signOut().then(() => {
            console.log('succes')
            Actions.NotLogHome()
        }).catch(function (error) {
            alert(error)
            console.log(error.message)
        });
        // })
    }
}
