import React, { useState } from 'react';
import { Prompt } from 'react-router-dom';

export default function Login(props) {

    const [userLogin, setUserLogin] = useState({ userName: '', passWord: '', status: false });

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newUserLogin = { ...userLogin, [name]: value };

        let valid = true;
        for (let key in newUserLogin) {
            if (key !== 'status') {
                if (newUserLogin[key].trim() !== '') {
                    valid = false;
                }
            }
        }

        if (!valid) {
            newUserLogin.status = true;
        } else newUserLogin.status = false;

        setUserLogin(newUserLogin);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userLogin.userName === 'cyberlearn' && userLogin.passWord === 'cyberlearn') {
            //success -> quay về trang trước đó
            props.history.goBack();

            //hoặc đi đến trang chỉ định
            //props.history.push('/home');

            //hoặc thay đổi nội dung bằng trang khác
            //props.history.replace('/home');

            //lưu user đã login vào localStorage
            localStorage.setItem('userLogin', JSON.stringify(userLogin));

        } else {
            alert('Failed login!');
            return;
        }
    }


    return <form className='container-fluid' onSubmit={handleSubmit}>
        <h3 className='mt-3'>LOGIN CYBERLEARN</h3>
        <div className="form-group">
            <p>Username</p>
            <input type="text" name='userName' className='form-control' onChange={handleChange} />
        </div>
        <div className="form-group">
            <p>Password</p>
            <input type="password" name='passWord' className='form-control' onChange={handleChange} />
        </div>
        <div className="form-group">
            <button type='submit' className='btn btn-primary'>Login</button>
        </div>
        <Prompt when={userLogin.status} message={(location) => {
            //console.log(location);
            return 'Bạn có chắc muốn rời khỏi trang này!'
        }} />
    </form>;
}
