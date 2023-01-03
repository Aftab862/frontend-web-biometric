import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Actions from 'store/actions';
import API from 'API/api';

// const AuthProtected = ({ children }) => {
//     const navigate = useNavigate();
//     useEffect(() => {
//         if (!localStorage.getItem('idToKen')) {
//             navigate('/login');
//         }
//     }, []);
//     return children;
// };

const AuthProtected = ({ children }) => {
    // const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        // if (localStorage.getItem('rcet-userId') && localStorage.getItem('IdToken')) {
        //     const fetchUserData = async () => {
        //         try {
        //             const res = await API.get(`/user/getUserData/${localStorage.getItem('rcet-userId')}`, {
        //                 headers: {
        //                     Authorization: `Bearer ${localStorage.getItem('IdToken')}`
        //                 }
        //             });
        //             dispatch(Actions.login(res.data));
        //         } catch (error) {
        //             console.log('error', error);
        //             navigate('/login');
        //         }
        //     };
        //     fetchUserData();
        // } else if (!localStorage.getItem('IdToken') || !localStorage.getItem('rcet-userId')) {
        //     navigate('/login');
        // }
        // eslint-disable-next-line
    }, []);
    return children;
};

export default AuthProtected;
