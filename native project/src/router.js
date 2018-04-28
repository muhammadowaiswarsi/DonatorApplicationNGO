import { Root } from "native-base";
import React, { Component } from 'react';
import firebase from 'firebase'
import Signup from './Components/signup';
import Signin from './Components/signin';
import Main from './Components/users/main';
import Main1 from './Components/ngo/main'
import Comments from './Components/comments'
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { currentuserdata } from './store/actions'
import SyncStorage from 'sync-storage';
import { Actions, Router, Scene } from 'react-native-router-flux'
import { BackHandler } from 'react-native'
import Front from './Components/Front'
import NotLogHome from './Components/notloghome'

class Routers extends Component {




  render() {
    return (
      <Root>
        <Router>
          <Scene key="root">
            <Scene
              key='front'
              component={Front}
              title='Frontpage'
              initial
            />
            <Scene
              key="main"
              component={Main}
              title="Main"
            />
            <Scene key="NotLogHome"
              component={NotLogHome}
              title="Sign Up"
            />
            <Scene
              key="Signin"
              component={Signin}
              title="Sign In"
            />
            <Scene key="Signup"
              component={Signup}
              title="Sign Up"
            />
            <Scene
              key="main1"
              component={Main1}
              title="Main"
            />
            <Scene key="comments"
              component={Comments}
              title="Messages"
            />
          </Scene>
        </Router >
      </Root>
    )
  }
}


function mapStateToProp(state) {
  return ({
    // userName: state.root.userName,
    // email: state.root.email
  })
}
function mapDispatchToProp(dispatch) {
  return {
    currentuser: (uid) => { dispatch(currentuserdata(uid)) }

  };
}

export default connect(mapStateToProp, mapDispatchToProp)(Routers);
