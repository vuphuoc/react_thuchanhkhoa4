import React, { useEffect, useRef, useState } from 'react';
import { Table, Button, Space, Tag, Popover, Popconfirm, message, Avatar, Image, AutoComplete } from 'antd';
import parse from 'html-react-parser';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_USER_PROJECT_API, DELETE_PROJECT_SAGA, GET_LIST_PROJECT_SAGA, GET_USER_API, REMOVE_USER_PROJECT_API } from '../../redux/types/CyberBugs/CyberBugsTypes';
import { OPEN_DRAWER } from '../../redux/types/CyberBugs/DrawerCyberBugsTypes';
import FormEditProject from '../../components/Forms/FormEditProject/FormEditProject';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';



function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
}

function cancel(e) {

}


export default function ProjectManagement(props) {

    const projectList = useSelector(state => state.ProjectCyberBugsReducer.projectList);

    //kết nối tới reducer lấy user đã search về
    const lstUserSearch = useSelector(state => state.UserCyberBugsReducer.userSearch);
    //console.log('lstUserSearch', lstUserSearch);

    //state để hiển thị giá trị của AutoComplete khi người dùng chọn
    const [value, setValue] = useState('');

    const searchRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_LIST_PROJECT_SAGA
        })
    }, []);

    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const clearFilters = () => {
        setState({ filteredInfo: null });
    };

    const clearAll = () => {
        setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    const setAgeSort = () => {
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };

    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id', //là prop 

            filteredValue: filteredInfo.name || null,
            sorter: (item2, item1) => {
                //trong js chỉ phép + cần ép kiểu
                return item2.id - item1.id;
            },
            sortDirections: ['descend']
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record, index) => {
                return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>
            },
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                //so sánh ASCII
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            },

        },
        // {
        //     title: 'Description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     render: (text, record, index) => {

        //         let jsxContent = parse(text);

        //         // console.log(`text:`, text);
        //         // console.log(`record: `, record);
        //         // console.log(`index: `, index);

        //         return <div key={index}>
        //             {jsxContent}
        //         </div>
        //     }
        // },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Creator',
            //vì creator là 1 object nên nếu cần lấy thông tin nào của creator ta có thể sử dụng hàm render
            //dataIndex: 'creator.name',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color='purple'>{text.creator?.name}</Tag>;
            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator.name?.trim().toLowerCase();
                let creator2 = item2.creator.name?.trim().toLowerCase();
                //so sánh ASCII
                if (creator2 < creator1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 3).map((item, index) => {
                        return <Popover key={index} placement='top' title="Members" content={() => {
                            return <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Avatar</th>
                                        <th>Name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {record.members?.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item.userId}</td>
                                            <td> <Avatar src={item.avatar} /></td>
                                            <td>{item.name}</td>
                                            <td><Button type='danger' shape='circle' icon={<DeleteOutlined />} onClick={() => {
                                                dispatch({
                                                    type: REMOVE_USER_PROJECT_API,
                                                    userProject: {
                                                        userId: item.userId,
                                                        projectId: record.id
                                                    }
                                                })
                                            }}>
                                            </Button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }}>
                            <Avatar key={index} src={item.avatar} />
                        </Popover>

                    })}

                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
                    <Popover placement="rightTop" title='Add member' content={() => {
                        return <AutoComplete

                            style={{ width: '100%' }}

                            options={lstUserSearch?.map((user, index) => {
                                //khi người dùng search user sẽ dispatch lên saga và gọi API => cập nhật listUser vào reducer
                                //sau đó từ component này lấy thông tin listUser từ Reducer về 
                                return { label: user.name, value: user.userId.toString() };

                            })}

                            onSearch={(value) => {

                                //debounce search user 
                                //nếu searchRef hiện tại đã có value thì clear
                                if (searchRef.current) {

                                    //khi người dùng gõ 1 ký tự thì sau 0.3s setTimeOut sẽ chạy,
                                    //nhưng nếu người dùng gõ tiếp hoặc remove ký tự vừa gõ
                                    //thì searchRef lúc này ko còn null nữa thì clearTimeout sẽ xóa setTimeOut bên dưới
                                    //để ko phải gọi API
                                    //cứ như vậy chỉ khi người dùng ngừng gõ thì sau 0.3s setTimeOut mới chạy
                                    //và dispatch lên API tìm user
                                    clearTimeout(searchRef.current);
                                }

                                //cứ sau 0.3s thì mới gọi API để search user
                                searchRef.current = setTimeout(() => {
                                    //dispatch lên saga lấy user về
                                    dispatch({
                                        type: GET_USER_API,
                                        keyWord: value
                                    })
                                }, 300);


                            }}

                            onSelect={(valueSelect, option) => {
                                // console.log('You choose: ', value);
                                // console.log(option);
                                //gán lại state value để AutoComplete hiển thị ra label thay vì value
                                setValue(option.label);
                                //dispatch lên saga gọi API gửi về backend
                                dispatch({
                                    type: ADD_USER_PROJECT_API,
                                    userProject: {
                                        "projectId": record.id,
                                        "userId": Number(valueSelect)
                                    }
                                })
                            }}

                            onChange={(text) => {
                                setValue(text);
                            }}

                            value={value}

                        ></AutoComplete>
                    }} trigger="click">
                        <Button type='circle'>+</Button>
                    </Popover>
                </div>

            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <button type='button' className='btn btn-primary' onClick={() => {

                        //dispatch lên Reducer gọi drawer và truyền vào Component
                        //là form Edit và tiêu đề form
                        dispatch({
                            type: 'OPEN_FORM_EDIT_PROJECT',
                            Component: <FormEditProject />,
                            title: 'Edit project'
                        })

                        //dispatch dòng hiện tại (project) được chọn lên reducer
                        const actionEditProject = {
                            type: 'EDIT_PROJECT',
                            projectEditModel: record
                        }

                        dispatch(actionEditProject);


                    }}><EditOutlined /></button>

                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() => {

                            //dispatch lên Saga gọi delete
                            dispatch({
                                type: DELETE_PROJECT_SAGA,
                                id: text.id
                            })
                        }}

                        okText="Yes"
                        cancelText="No"
                    >
                        <button type='button' className='btn btn-danger'> <DeleteOutlined />  </button>
                    </Popconfirm>


                </Space>
            ),
        },
    ];


    return (
        <div className='container-fluid mt-3'>
            <h3>Project management</h3>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />


        </div>
    )
}
