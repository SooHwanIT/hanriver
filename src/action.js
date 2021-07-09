import axios from 'axios';

export const getHanRiver = () => {
    return ( dispatch) =>{
        dispatch({type : 'REQUEST_PENDING'});

    axios.get('https://hanriver.herokuapp.com/').then(response => {
        dispatch({
            type : 'REQUEST_SUCCESS',
            payload:response.data
        });
    }).catch(error => {
        console.log(error);
        dispatch({type:'REQUEST_FAILURL'});
    })
}
};