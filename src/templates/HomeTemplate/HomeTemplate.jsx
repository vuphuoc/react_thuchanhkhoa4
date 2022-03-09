import React, { Fragment } from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../../components/Home/Header/Header';

//HOC HomeTemplate
export default function HomeTemplate(props) {

    //tách component từ props
    const { Component, ...restParams } = props;

    return <Route path={restParams.path} render={(propsRoute) => {
        return <Fragment>
            <Header />
            <Component {...propsRoute} />
        </Fragment>
    }} />
}
