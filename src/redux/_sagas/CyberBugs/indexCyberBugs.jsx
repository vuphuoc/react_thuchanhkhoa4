import React, { useEffect } from 'react';
import ContentMain from '../../../components/CyberBugs/Main/ContentMain';
import HeaderMain from '../../../components/CyberBugs/Main/HeaderMain';
import InfoMain from '../../../components/CyberBugs/Main/InfoMain';
import { useSelector, useDispatch } from 'react-redux';
import { GET_PROJECT_DETAIL } from '../../types/CyberBugs/CyberBugsTypes';


export default function DetailCyberBugs(props) {

    const { projectDetail } = useSelector(state => state.ProjectReducer);
    const dispatch = useDispatch();

    console.log('projectDetail', projectDetail);

    useEffect(() => {
        //khi người dùng link tới trang này thì lấy tham số từ URL và gọi saga
        const { projectId } = props.match.params;
        dispatch({
            type: GET_PROJECT_DETAIL,
            projectId
        })

    }, [])



    return (
        <div className="main">
            <HeaderMain projectDetail={projectDetail} />

            <InfoMain projectDetail={projectDetail} />
            <ContentMain projectDetail={projectDetail} />

        </div>
    )
}
