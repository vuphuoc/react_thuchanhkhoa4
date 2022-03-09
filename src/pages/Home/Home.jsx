import React from 'react';
import { useSelector } from 'react-redux';


export default function Home(props) {

    const userLogin = useSelector(state => state.UserCyberBugsReducer.userLogin);

    //console.log(props);
    const { name, avatar, id } = userLogin;

    return <div>
        Trang chủ
    </div>;
}
