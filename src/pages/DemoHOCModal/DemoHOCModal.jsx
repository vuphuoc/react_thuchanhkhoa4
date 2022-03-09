import React from 'react'
import { useDispatch } from 'react-redux';
import SlideDown from '../../HOC/Modal/SlideDown';
import Login from '../Login/Login';
import Register from '../Register/Register';



export default function DemoHOCModal() {

    const dispatch = useDispatch();

    //khởi tạo component SlideDown và truyền vào component Login
    //const LoginWithSlideDown = new SlideDown(Login);

    //khởi tạo component SlideDown và truyền vào component Login dưới dạng function
    const LoginWithSlideDown = function () {
        return new SlideDown(Login);
    }

    return (
        <div>
            {/* Button trigger modal */}
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modelId"
                onClick={() => {
                    dispatch({
                        type: 'OPEN_FORM',
                        Component: <Login />
                    })
                }}
            >
                Đăng nhập
            </button>

            <button type='button' className="btn btn-primary" data-toggle="modal" data-target="#modelId"
                onClick={() => {
                    dispatch({
                        type: 'OPEN_FORM',
                        Component: <Register />
                    })
                }}
            >
                Đăng ký
            </button>

            {/*Gọi LoginWithSlideDown dưới dạng function*/}
            {/* {LoginWithSlideDown} */}

            {/* Gọi LoginWithSlideDown dưới dạng thẻ */}
            <LoginWithSlideDown />
        </div>
    )
}
