import React, { Fragment } from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import ContentMain from '../../components/CyberBugs/Main/ContentMain';
import HeaderMain from '../../components/CyberBugs/Main/HeaderMain';
import InfoMain from '../../components/CyberBugs/Main/InfoMain';
import MenuCyberBugs from '../../components/CyberBugs/MenuCyberBugs';
import ModalCyberBugs from '../../components/CyberBugs/ModalCyberBugs/ModalCyberBugs';
import SidebarCyberBugs from '../../components/CyberBugs/SidebarCyberBugs';
import '../../index.css';

//HOC HomeTemplate
export default function CyberBugsTemplate(props) {

    //tách component từ props
    const { Component, ...restParams } = props;

    return <Route path={restParams.path} render={(propsRoute) => {
        return <Fragment>
            <div className='jira'>
                {/* Sider Bar  */}
                <SidebarCyberBugs />
                {/* Menu */}
                <MenuCyberBugs />

                {/* MAIN */}
                <Component {...propsRoute} />

            </div>
            {/* Modal CyberBugs */}
            <ModalCyberBugs />



        </Fragment>
    }} />
}
