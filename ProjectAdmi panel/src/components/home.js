import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ngospostrequestaccpt, ngospostrequest, acceptbtnngos, ngosrequest, deletepost, signout, donatorsdata, getngosdata, deletebtndonator, deletebtnngos, posts, likedata, commentdata } from '../store/action/action';
import "../App.css";
import RaisedButton from 'material-ui/RaisedButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import Icons from 'react-icons/lib/md/account-circle'
import Like from 'react-icons/lib/md/thumb-up'
import Chat from 'react-icons/lib/md/chat'
import Dialog from 'material-ui/Dialog';
import Dialog1 from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { transparent, white } from 'material-ui/styles/colors';
import Delete from 'react-icons/lib/md/delete'
import PercentageCircle from "react-circle-percentage";


const style = {
    height: 'auto',
    width: '60%',
    margin: 20,
    display: 'inline-block',
    fontSize: '130%',
    backgroundColor: 'white',
    opacity: 0.9,
    padding: '0.2%'
};


class AdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loader: false,
            value: 'a',
            open: false,
            open1: false,
            open2: false,
            ind: '',
            uid: ''
        }
    }


    handleClose = () => {
        this.setState({ open: false });
    };

    handleClose1 = () => {
        this.setState({ open1: false });
    };


    componentWillUpdate() {
        localStorage.setItem("type", JSON.stringify("/home"))
    }

    acceptbtnngos(uid) {
        // console.log(uid)
        this.props.acceptbtnngos(uid)
    }

    signout = () => {
        this.props.signout()
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    ngospostrequest(uid, index) {
        // console.log(uid)
        // console.log(index)
        let key = this.props.ngopostreqkey1[index]
        // console.log(key)
        this.props.ngospostrequestaccpt(uid, key)
    }

    deletebtndonator(uid) {
        // console.log(uid)
        this.props.deletebtndonator(uid)
    }

    deletebtnngos(uid) {
        // console.log(uid)
        this.props.deletebtnngos(uid)
    }

    componentWillMount() {
        this.props.getdonatorsdata();
        this.props.getngosdata();
        this.props.posts();
        this.props.ngosrequest();
        this.props.ngospostrequest();
    }

    likedata(uid, index) {
        // console.log(uid)
        // console.log(index)
        let pushkey = this.props.postkeys1[index]
        // console.log(pushkey)
        this.props.likedata(uid, pushkey)
        this.setState({
            open: true
        })
    }

    deletepost(uid, index) {
        // console.log(uid)
        // console.log(index)
        let pushkey = this.props.postkeys1[index]
        // console.log(pushkey)
        this.props.deletepost(uid, pushkey)
    }

    commentdata(uid, index) {
        console.log(uid)
        console.log(index)
        let pushkey = this.props.postkeys1[index]
        console.log(pushkey)
        this.props.commentdata(uid, pushkey)
        this.setState({
            open1: true
        })
    }


    render() {

        // console.log(this.props.donatorsdata1)
        console.log(this.props.ngopostreq1)

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        const actions1 = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose1}
            />
        ];

        // console.log(this.props.ngosrequest1)
        return (
            <div>
                <div style={{ height: 'auto', minHeight: 670, maxHeight: 'auto' }}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                    >


                        <Tab style={{ background: '#6FFFF4', color: '#6A1FFF' }} label="Users" value="a">


                            <div>

                                <h2 className="mainh" style={{ color: "Black", fontSize: 45, backgroundColor: white, opacity: 0.9, display: 'inline-block' }}>Donator Users</h2>


                                <Table style={{ background: transparent, color: '#3249E8', fontSize: 30 }}>
                                    <TableHeader adjustForCheckbox={false} displaySelectAll={false} style={{ fontWeight: 'bold' }} columnNumber={4}>
                                        <TableRow>
                                            <TableRowColumn style={{ fontWeight: 'bold', color: '#2AFF5C', fontSize: 30, backgroundColor: 'white', opacity: 0.9 }}>Username</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: 'bold', color: '#2AFF5C', fontSize: 30, backgroundColor: 'white', opacity: 0.9 }}>Email</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: 'bold', color: '#2AFF5C', fontSize: 30, backgroundColor: 'white', opacity: 0.9 }}>Number</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: 'bold', color: '#2AFF5C', fontSize: 30, backgroundColor: 'white', opacity: 0.9 }}>Delete</TableRowColumn>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody displayRowCheckbox={false}>
                                        {this.props.donatorsdata1 ? this.props.donatorsdata1.map((value, index) => {
                                            // console.log(value.uid)
                                            let uid = value.uid
                                            return <TableRow key={index} style={{ color: '#3249E8' }} >
                                                <TableRowColumn style={{ fontSize: 25, backgroundColor: 'white', opacity: 0.9 }}>{value.username}</TableRowColumn>
                                                <TableRowColumn style={{ fontSize: 25, backgroundColor: 'white', opacity: 0.9 }}>{value.email}</TableRowColumn>
                                                <TableRowColumn style={{ fontSize: 25, backgroundColor: 'white', opacity: 0.9 }}>{value.contact}</TableRowColumn>
                                                <TableRowColumn style={{ backgroundColor: 'white', opacity: 0.7 }}><RaisedButton label="Delete" primary={true} className="style1" onClick={this.deletebtndonator.bind(this, uid)} /></TableRowColumn>
                                            </TableRow>
                                        })
                                            : null}
                                    </TableBody>

                                </Table>



                                <h2 className="mainh" style={{ color: "Black", textAlign: 'center', fontSize: 45, backgroundColor: white, opacity: 0.9, display: 'inline-block' }}>Ngo's Users</h2>
                                <Table style={{ background: 'transparent' }}>
                                    <TableHeader adjustForCheckbox={false} displaySelectAll={false} className="bold">
                                        <TableRow>
                                            <TableRowColumn style={{ fontWeight: 'bold', color: '#2AFF5C', fontSize: 30, backgroundColor: 'white', opacity: 0.9 }} > Username</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: 'bold', color: '#2AFF5C', fontSize: 30, backgroundColor: 'white', opacity: 0.9 }}>Email</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: 'bold', color: '#2AFF5C', fontSize: 30, backgroundColor: 'white', opacity: 0.9 }}>Number</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: 'bold', color: '#2AFF5C', fontSize: 30, backgroundColor: 'white', opacity: 0.9 }}>Delete</TableRowColumn>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody displayRowCheckbox={false}>
                                        {this.props.ngosdata1 ? this.props.ngosdata1.map((value, index) => {
                                            // console.log(value.uid)
                                            let uid = value.uid
                                            return <TableRow key={index} style={{ color: '#3249E8' }}>
                                                <TableRowColumn style={{ fontSize: 25, backgroundColor: 'white', opacity: 0.9 }}>{value.username}</TableRowColumn>
                                                <TableRowColumn style={{ fontSize: 25, backgroundColor: 'white', opacity: 0.9 }}>{value.email}</TableRowColumn>
                                                <TableRowColumn style={{ fontSize: 25, backgroundColor: 'white', opacity: 0.9 }}>{value.contact}</TableRowColumn>
                                                <TableRowColumn style={{ backgroundColor: 'white', opacity: 0.7 }}><RaisedButton label="Delete" secondary={true} className="style1" onClick={this.deletebtnngos.bind(this, uid)} /></TableRowColumn>
                                            </TableRow>
                                        }) : null}
                                    </TableBody>
                                </Table>
                            </div>

                        </Tab>




                        <Tab style={{ background: '#6FFFF4', color: '#6A1FFF', borderColor: '#DB16E8' }} label="Posts" value="b">

                            <h2 className="mainh" style={{ color: "Black", fontSize: 45, backgroundColor: white, opacity: 0.9, display: 'inline-block' }}>Posts</h2>

                            <div style={{ textAlign: 'center' }}>
                                {this.props.posts1 ?

                                    this.props.posts1.map((value, index) => {
                                        let uid = value.uid
                                        let donationCircle = Math.floor((value.donation / value.requirementmoney) * 100);
                                        return < Paper style={style} zDepth={3} key={index}>


                                            <ul style={{ textAlign: 'left' }}><Icons style={{ fontSize: '220%' }} />  {value.name}
                                                <br />
                                                <span style={{ fontSize: '70%', float: 'left', marginLeft: '6%' }}>{value.date}</span>
                                            </ul>
                                            <span style={{ float: 'right', marginRight: '10%' }}><PercentageCircle percentage={donationCircle} /></span>

                                            <ul style={{ textAlign: 'left', marginTop: '5%' }}>{value.requirement} it is required {value.requirementmoney}</ul>

                                            <ul>
                                                <span onClick={this.likedata.bind(this, uid, index)} style={{ textAlign: 'left', marginRight: '30%', cursor: 'pointer' }}><Like /> {value.likes}</span>
                                                <span onClick={this.commentdata.bind(this, uid, index)} style={{ textAlign: 'right', marginLeft: '30%', cursor: 'pointer' }}><Chat />  Comments</span>
                                            </ul>
                                            <ul>
                                                <FlatButton
                                                    style={{ color: 'red' }}
                                                    onClick={() => { this.deletepost(uid, index) }}
                                                    label={<span style={{ fontSize: 30 }}><Delete /></span>}
                                                />
                                            </ul>


                                        </Paper>

                                    })
                                    : null}

                            </div>

                            <div>
                                <Dialog
                                    title="Like Users"
                                    actions={actions}
                                    modal={true}
                                    open={this.state.open}
                                >
                                    {this.props.likedata ?
                                        this.props.likedata1.map((value, index) => {
                                            return <ul key={index}>{index + 1} {value}</ul>
                                        }) : null
                                    }
                                </Dialog>
                            </div>


                            <div>
                                <Dialog1
                                    title="Comments"
                                    actions={actions1}
                                    modal={true}
                                    open={this.state.open1}
                                >
                                    {this.props.commentdata1 ?
                                        this.props.commentdata1.map((value, index) => {
                                            return <div style={{ backgroundColor: '#F4F2FF' }} key={index}>
                                                <ul style={{ textAlign: 'left', marginTop: '5%' }}><Icons style={{ fontSize: '220%' }} />  <span style={{ marginBottom: '10%', fontSize: 20 }}>{value.username}</span> <br />
                                                    <span style={{ fontSize: '120%', marginLeft: '6%' }}>{value.comment}</span>
                                                </ul>
                                            </div >
                                        })
                                        : null
                                    }
                                </Dialog1>
                            </div>
                        </Tab>



                        <Tab style={{ background: '#6FFFF4', color: '#6A1FFF', borderColor: '#DB16E8' }} label="Requests" value="c">
                            <div>

                                <h2 className="mainh" style={{ color: "Black", fontSize: 45, backgroundColor: white, opacity: 0.9, display: 'inline-block' }}>NGO'S Requests</h2>


                                <Table style={{ background: transparent, color: '#3249E8', fontSize: 30 }}>
                                    <TableHeader adjustForCheckbox={false} displaySelectAll={false} style={{ fontWeight: 'bold' }} columnNumber={4}>
                                        <TableRow>
                                            <TableRowColumn style={{ fontWeight: 'bold', color: '#2AFF5C', fontSize: 30, backgroundColor: 'white', opacity: 0.9 }}>Username</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: 'bold', color: '#2AFF5C', fontSize: 30, backgroundColor: 'white', opacity: 0.9 }}>Email</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: 'bold', color: '#2AFF5C', fontSize: 30, backgroundColor: 'white', opacity: 0.9 }}>Number</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: 'bold', color: '#2AFF5C', fontSize: 30, backgroundColor: 'white', opacity: 0.9 }}>Accept</TableRowColumn>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody displayRowCheckbox={false}>
                                        {this.props.ngosrequest1 ? this.props.ngosrequest1.map((value, index) => {
                                            // console.log(value.uid)
                                            let uid = value.uid
                                            return <TableRow key={index} style={{ color: '#3249E8' }} >
                                                <TableRowColumn style={{ fontSize: 25, backgroundColor: 'white', opacity: 0.9 }}>{value.username}</TableRowColumn>
                                                <TableRowColumn style={{ fontSize: 25, backgroundColor: 'white', opacity: 0.9 }}>{value.email}</TableRowColumn>
                                                <TableRowColumn style={{ fontSize: 25, backgroundColor: 'white', opacity: 0.9 }}>{value.contact}</TableRowColumn>
                                                <TableRowColumn style={{ backgroundColor: 'white', opacity: 0.7 }}><RaisedButton label="Accept" primary={true} className="style1" onClick={() => this.acceptbtnngos(uid)} /></TableRowColumn>
                                            </TableRow>
                                        })
                                            : <h2>No Requests</h2>
                                        }
                                    </TableBody>

                                </Table>



                                <h2 className="mainh" style={{ color: "Black", fontSize: 45, backgroundColor: white, opacity: 0.9, display: 'inline-block' }}>Posts for Permission</h2>

                                <div style={{ textAlign: 'center' }}>
                                    {this.props.ngopostreq1 ?
                                        this.props.ngopostreq1.map((value, index) => {
                                            let uid = value.uid
                                            return < Paper style={style} zDepth={3} key={index}>
                                                <ul style={{ textAlign: 'left' }}><Icons style={{ fontSize: '220%' }} />  {value.name} <br />
                                                    <span style={{ fontSize: '70%', marginLeft: '6%' }}>{value.date}</span>
                                                </ul>

                                                <ul style={{ textAlign: 'left' }}>{value.requirement} it is required {value.requirementmoney}</ul>
                                                <ul><FlatButton
                                                    style={{ color: 'red' }}
                                                    onClick={() => this.ngospostrequest(uid, index)}
                                                    label={<span style={{ fontWeight: 'bold' }}>Publish</span>}
                                                /></ul>
                                            </Paper>

                                        })
                                        : null}

                                </div>
                            </div>

                        </Tab>

                    </Tabs>




                </div>
            </div>

        )
    }
}



function mapStateToProp(state) {
    return ({
        donatorsdata1: state.root.donatorsdata,
        ngosdata1: state.root.ngosdata,
        postkeys1: state.root.postkeys,
        posts1: state.root.posts,
        likedata1: state.root.likedata,
        commentdata1: state.root.commentdata,
        ngosrequest1: state.root.ngosrequest,
        ngopostreq1: state.root.ngopostreq,
        ngopostreqkey1: state.root.ngopostreqkey
    })
}




function mapDispatchToProp(dispatch) {
    return ({
        getdonatorsdata: () => { dispatch(donatorsdata()) },
        signout: () => { dispatch(signout()) },
        getngosdata: () => { dispatch(getngosdata()) },
        deletebtndonator: (uid) => { dispatch(deletebtndonator(uid)) },
        deletebtnngos: (uid) => { dispatch(deletebtnngos(uid)) },
        posts: () => { dispatch(posts()) },
        likedata: (uid, pushkey) => { dispatch(likedata(uid, pushkey)) },
        commentdata: (uid, pushkey) => { dispatch(commentdata(uid, pushkey)) },
        deletepost: (uid, pushkey) => { dispatch(deletepost(uid, pushkey)) },
        ngosrequest: () => { dispatch(ngosrequest()) },
        acceptbtnngos: (uid) => { dispatch(acceptbtnngos(uid)) },
        ngospostrequest: () => { dispatch(ngospostrequest()) },
        ngospostrequestaccpt: (uid, key) => { dispatch(ngospostrequestaccpt(uid, key)) },
    })
}




export default connect(mapStateToProp, mapDispatchToProp)(AdminPage);