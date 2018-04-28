import React, { Component } from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import Home from './components/home.js';
import Signin from './components/signin';
import history from './History';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { signout } from './store/action/action';
import { connect } from 'react-redux';
import "./App.css";
import firebase from 'firebase';


function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />
    )
}



class Routers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authed: false,
        }
    }


    componentWillMount() {
        let that = this
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                that.setState({
                    authed: true,
                })
                let type = localStorage.getItem("type")
                let convertype = JSON.parse(type)
                if (convertype !== null) {
                    history.push(convertype)
                }
            }

            else {
                console.log(user)
                that.setState({
                    authed: false
                })
            }
        });
    }


    render() {
        return (
            <div >
                <AppBar title="Welcome Admin Panel" showMenuIconButton={false} iconElementRight={<RaisedButton label="Signout" primary={true} className="style1" onClick={this.props.signout} />} />
                <Router history={history}>
                    <div>
                        <Route exact path="/" component={Signin} />
                        <PrivateRoute authed={this.state.authed} path="/home" component={Home} />
                    </div>
                </Router>
            </div>
        )
    }
}




function mapDispatchToProp(dispatch) {
    return ({
        signout: () => { dispatch(signout()) },
    })
}


export default connect(null, mapDispatchToProp)(Routers);