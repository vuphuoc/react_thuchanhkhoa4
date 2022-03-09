import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MenuCyberBugs() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={require('../../assets/img/download.jfif')} alt='' />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">

                <div>
                    <i className="fa fa-credit-card mr-1" />
                    <NavLink to='/cyberbugs' className='text-dark' activeStyle={{ color: '#0d77e5' }} activeClassName='active font-weight-bold'>Cyber Board</NavLink>
                </div>


                <div >
                    <i className="fa fa-cog mr-1" />
                    <NavLink to='/createproject' className='text-dark' activeStyle={{ color: '#0d77e5' }} activeClassName='active font-weight-bold'>Create project</NavLink>
                </div>
                <div >
                    <i className="fa fa-cog mr-1" />
                    <NavLink to='/projectmanagement' className='text-dark' activeStyle={{ color: '#0d77e5' }} activeClassName='active font-weight-bold'>Project management</NavLink>
                </div>


            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" />
                    <span>Components</span>
                </div>
            </div>
        </div>


    )
}
