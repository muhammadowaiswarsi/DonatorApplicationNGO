import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinAction } from '../store/action/action';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import "../App.css"
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
    height: "auto",
    width: 350,
    margin: 10,
    marginTop: '10%',
    padding: "10px",
    textAlign: 'center',
    display: 'inline-block',
};

const style1 = {
    margin: 12,
};



class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loader: false
        }

        this.signin = this.signin.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);
    }



    signin(event) {
        if (!(this.state.email && this.state.password)) {
            alert('Please write Email and Password')
        } else {
            event.preventDefault()
            this.setState({
                loader: true
            })

            let user = {
                email: this.state.email,
                password: this.state.password
            }
            this.props.signinWithEmailPassword(user);
            setTimeout(() => {
                this.setState({
                    loader: false
                })
            }, 3000)
        }
    }


    _onChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }


    _onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }


    render() {
        let { loader } = this.state
        return (
            <div className='background' style={{ minHeight: 670, maxHeight: 800 }}>

                <div className="box">

                    <Paper style={style} zDepth={5}>

                        <form type='submit'>
                            <h1>Signin Here....</h1>

                            <TextField hintText="Type your email here..." floatingLabelText="email" type='email' name='email' value={this.state.email} onChange={this._onChangeEmail} required />
                            <br />

                            <TextField hintText="Type your password here..." floatingLabelText="Password" type='password' name='password' value={this.state.password} onChange={this._onChangePassword} required />
                            <br /><br />

                            {loader &&
                                <CircularProgress size={80} thickness={5} />
                            }
                            <br />

                            <span style={{ color: 'red' }}>{this.props.errorsignin1}</span>

                            <br />
                            <RaisedButton type='submit' label="Signin" primary={true} style={style1} onClick={this.signin} />
                            <br />

                        </form>


                    </Paper >

                </div >

            </div >
        )
    }
}



function mapStateToProp(state) {
    return ({
        errorsignin1: state.root.errorsignin
    })
}




function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        signinWithEmailPassword: (user) => {
            dispatch(signinAction(user))
        }
    })
}



export default connect(mapStateToProp, mapDispatchToProp)(Signin);