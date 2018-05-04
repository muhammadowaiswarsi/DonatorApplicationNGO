import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    errorsignin: '',
    donatorsdata: [],
    ngosdata: [],
    postkeys: [],
    posts: [],
    likedata: [],
    commentdata: [],
    ngosrequest: [],
    ngopostreq: [],
    ngopostreqkey: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ActionTypes.ERRORSN:
            return ({
                ...state,
                errorsignin: action.payload
            })

        case ActionTypes.DONATORSDATA:
            console.log(action.payload)
            return ({
                ...state,
                donatorsdata: action.payload
            })

        case ActionTypes.NGOSDATA:
            return ({
                ...state,
                ngosdata: action.payload
            })

        case ActionTypes.REQUIRMENTPOSTKEYS:
            return ({
                ...state,
                postkeys: action.payload
            })

        case ActionTypes.REQUIRMENTPOST:
            return ({
                ...state,
                posts: action.payload
            })

        case ActionTypes.LIKEDATA:
            return ({
                ...state,
                likedata: action.payload
            })

        case ActionTypes.COMMENTDATA:
            return ({
                ...state,
                commentdata: action.payload
            })

        case ActionTypes.NGOSREQUEST:
            return ({
                ...state,
                ngosrequest: action.payload
            })

        case ActionTypes.NGOPOSTREQ:
            console.log(action.payload)
            return ({
                ...state,
                ngopostreq: action.payload
            })

        case ActionTypes.NGOPOSTREQKEY:
            return ({
                ...state,
                ngopostreqkey: action.payload
            })

        default:
            return state;
    }

}