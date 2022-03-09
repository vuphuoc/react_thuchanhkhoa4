import React, { useState } from 'react'
import { Drawer, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../../redux/types/CyberBugs/DrawerCyberBugsTypes';

export default function DrawerCyberBugs(props) {

    const { visible, ComponenContentDrawer, callBackSubmit, title } = useSelector(state => state.DrawerCyberBugsReducer);
    const dispatch = useDispatch();

    const showDrawer = () => {
        dispatch({
            type: OPEN_DRAWER,

        })
    }

    const onClose = () => {
        dispatch({
            type: CLOSE_DRAWER,

        })
    }

    return (
        <div>
            {/* <button type='button' onClick={showDrawer}>Open drawer</button> */}
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {ComponenContentDrawer}

            </Drawer>
        </div>
    )
}
