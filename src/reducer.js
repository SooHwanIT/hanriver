const initalState = {
    status:'SUCCESS',
    data:{
        temp : '',
        time : ''
    }
}

const reducer = (state = initalState, action)=>{
    switch(action.type){
        case 'REQUEST_PENDING':
        return{
            ...state,
            status: 'PENDING'
        }
        case 'REQUEST_SUCCESS' :
        return{
            status : 'SUCCESS',
            data : action.payload
        }

        case 'REQUEST_FAILURE':
            return {
                ...state,
                status:'ERROR'
            }
            default :
            return state;
    }
}
export default reducer;