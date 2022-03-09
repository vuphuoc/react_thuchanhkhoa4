import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {

    const activeNavItemStyles = {
        fontSize: '1.1rem',
        backgroundColor: '#FFF',
        color: 'black'
    }

    const userLogin = useSelector(state => state.UserCyberBugsReducer.userLogin);

    //console.log(props);
    const { name, avatar, id } = userLogin;



    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">Cyberlearn</NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' activeStyle={activeNavItemStyles} className="nav-link" to="/home">Home <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' activeStyle={activeNavItemStyles} className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' activeStyle={activeNavItemStyles} className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' activeStyle={activeNavItemStyles} className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' activeStyle={activeNavItemStyles} className="nav-link" to="/profile">Profile</NavLink>
                    </li>
                    <li className="nav-item">

                    </li>
                    <li className="nav-item">

                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Bài tập
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                            <NavLink activeClassName='activeNavItem' activeStyle={activeNavItemStyles} className="dropdown-item" to="/todolistrfc">TodoList RFC</NavLink>

                            <NavLink activeClassName='activeNavItem' activeStyle={activeNavItemStyles} className="dropdown-item" to="/todolistrcc">TodoList RCC</NavLink>

                            <NavLink activeClassName='activeNavItem' activeStyle={activeNavItemStyles} className="dropdown-item" to="/todolistredux">TodoList Redux</NavLink>

                            <NavLink activeClassName='activeNavItem' activeStyle={activeNavItemStyles} className="dropdown-item" to="/todolistsaga">TodoList Redux Saga</NavLink>

                            <NavLink activeClassName='activeNavItem' activeStyle={activeNavItemStyles} className="dropdown-item" to="/demohocmodal">Demo HOC modal</NavLink>
                        </div>
                    </li>

                </ul>
                <div className='form-inline header__userInfo'>
                    <span className='header__userInfo_name'>Hi {name}</span>
                    <img className='header__userInfo_avatar' src={avatar} alt={name} style={{ width: '40px', height: '40px' }} />
                </div>
            </div>
        </nav>

    )
}

