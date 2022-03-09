import React from 'react'
import styles from './LoadingComponent.module.css';
import { useSelector } from 'react-redux';


export default function LoadingComponent() {

    const { isLoading } = useSelector(state => state.LoadingReducer);

    if (isLoading) {
        return (

            <div className={styles.bgLoading}>
                <img src={require('../../../assets/imgLoading/loading.gif')} className="img-fluid" alt="Loading" />
            </div>
        )
    } else return '';

}
