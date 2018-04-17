import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    signuperror: "",
    signinerror: "",
    signin: '',
    ngodata: [],
    requirmentpost: [],
    requirmentpostkeys: [],
    userdata: [],
    activelike: '',
    commentcomp: [],
    currentuser: '',
    postcomment: '',
    commentdata: [],
    donationmoneyindex: '',
    donationmoney: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SIGNIN:
            console.log(action.payload)
            return ({
                ...state,
                signin: action.payload
            })

        case ActionTypes.SIGNUPERROR:
            return ({
                ...state,
                signuperror: action.payload
            })

        case ActionTypes.NGODATA:
            return ({
                ...state,
                ngodata: action.payload
            })

        case ActionTypes.SIGNINERROR:
            return ({
                ...state,
                signinerror: action.payload
            })

        case ActionTypes.REQUIRMENTPOST:
            return ({
                ...state,
                requirmentpost: action.payload
            })

        case ActionTypes.REQUIRMENTPOSTKEYS:
            return ({
                ...state,
                requirmentpostkeys: action.payload
            })

        case ActionTypes.USERSDATA:
            return ({
                userdata: action.payload
            })

        case ActionTypes.ACTIVELIKE:
            return ({
                activelike: action.payload
            })

        case ActionTypes.COMMENTBOX:
            // console.log(action.payload)
            return ({
                ...state,
                commentcomp: action.payload
            })

        case ActionTypes.CURRENTUSER:
            return ({
                currentuser: action.payload
            })

        case ActionTypes.POSTCOMMENT:
            return ({
                ...state,
                postcomment: action.payload
            })

        case ActionTypes.COMMENTDATA:
            return ({
                ...state,
                commentdata: action.payload
            })

        case ActionTypes.DONATIONMONEYINDEX:
            return ({
                ...state,
                donationmoneyindex: action.payload
            })

        case ActionTypes.DONATIONMONEY:
            return ({
                ...state,
                donationmoney: action.payload
            })


        default:
            return state;
    }

}