import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuOutlined,
    ArrowLeftOutlined,
    SearchOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { OPEN_FORM_CREATE_TASK } from '../../redux/types/CyberBugs/DrawerCyberBugsTypes';
import FormCreateTask from '../Forms/FormCreateTask/FormCreateTask';


const { Header, Sider, Content } = Layout;

export default function SidebarCyberBugs() {

    const [state, setState] = useState({
        collapsed: false
    })

    const dispatch = useDispatch();

    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };

    let renderCollapseIcon = () => {
        return state.collapsed ? <div className='text-center' onClick={toggle} style={{ cursor: 'pointer', color: '#fff', fontSize: '20px' }}>
            <MenuOutlined />
        </div> : <div className='text-right pr-2' onClick={toggle} style={{ cursor: 'pointer', color: '#fff', fontSize: '20px' }}>
            <ArrowLeftOutlined />
        </div>
    }

    return (
        <div>

            <Sider trigger={null} collapsible collapsed={state.collapsed} style={{ height: '100%' }}>
                {renderCollapseIcon()}
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={({ key, keyPath, domEvent }) => {

                    //create task clicked
                    if (key == 2) {
                        dispatch({
                            type: OPEN_FORM_CREATE_TASK,
                            Component: <FormCreateTask />,
                            title: 'Create task',
                            visible: true
                        })
                    }

                }} >
                    <Menu.Item key="1" icon={<SearchOutlined style={{ fontSize: '20px' }} />}>
                        Search
                    </Menu.Item>
                    <Menu.Item key="2" icon={<PlusCircleOutlined style={{ fontSize: '20px' }} />}>
                        Create task
                    </Menu.Item>
                    <Menu.Item key="3" icon={<PlusCircleOutlined style={{ fontSize: '20px' }} />}>
                        Create issue
                    </Menu.Item>
                </Menu>
            </Sider>
        </div>


    )
}
