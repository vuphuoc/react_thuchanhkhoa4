import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { Select, Slider } from 'antd';
import { GET_ALL_PROJECT_SAGA } from '../../../redux/types/CyberBugs/CyberBugsTypes';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/types/CyberBugs/TaskTypeTypes';

const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}




export default function FormCreateTask(props) {


    const { arrProject } = useSelector(state => state.ProjectCyberBugsReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    console.log('arr task: ', arrTaskType);
    const dispatch = useDispatch();

    //hook
    useEffect(() => {
        //get all project for select project
        dispatch({ type: GET_ALL_PROJECT_SAGA });
        //get all taskType for select taskType
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    }, []);



    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    });


    const editorRef = useRef(null);
    const [size, setSize] = React.useState('default');

    const handleSizeChange = e => {
        setSize(e.target.value);
    };

    function handleChangeSelect(value) {
        console.log(`Selected: ${value}`);
    }


    return (
        <div className='container-fluid'>
            <div className="form-group">
                <label htmlFor="projectId">Project</label>
                <select name="projectId" className="form-control">
                    {
                        arrProject.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectName}</option>
                        })
                    }
                </select>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="priorityId">Priority</label>
                        <select name="priorityId" className="form-control">
                            <option value="1">New task</option>
                            <option value="1">Bug</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <label htmlFor="typeId">Task type</label>
                        <select name="typeId" className="form-control" >
                            {arrTaskType.map((taskType, index) => {
                                return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>

            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="assigner">Assigner</label>
                        <Select
                            name='assigner'
                            mode="multiple"
                            size={size}
                            options={[{ value: 'a12', label: 'label_a12' }, { value: 'a13', label: 'label_a13' }]}
                            placeholder="Please select"
                            defaultValue={['a10', 'c12']}
                            onChange={handleChangeSelect}
                            style={{ width: '100%' }}
                        >
                            {children}
                        </Select>
                        <div className="row mt-5">
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="originalEstimate">Original Estimate</label>
                                    <input type="number" name='originalEstimate' className='form-control' min={0} defaultValue={0} />
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-6">
                        <label>Time tracking</label>
                        <Slider defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                        <div className="row">
                            <div className="col-6 text-left">{timeTracking.timeTrackingSpent}h logged</div>
                            <div className="col-6 text-right">{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>

                        <div className="row mt-4" >
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="timeTrackingSpent">Time spent</label>
                                    <input type="number"
                                        defaultValue={0}
                                        min={0}
                                        className="form-control" name="timeTrackingSpent"
                                        onChange={(e) => {
                                            setTimeTracking({
                                                ...timeTracking,
                                                timeTrackingSpent: e.target.value
                                            })
                                        }} />

                                </div>

                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="timeTrackingRemaining">Time remaining</label>
                                    <input type="number"
                                        defaultValue={0}
                                        min={0}
                                        className="form-control" name="timeTrackingRemaining"
                                        onChange={(e) => {
                                            setTimeTracking({
                                                ...timeTracking,
                                                timeTrackingRemaining: e.target.value
                                            })
                                        }} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="description" className='font-weight-bold'>Description</label>
                <Editor
                    name='description'
                    onInit={(evt, editor) => {

                        //editorRef.current.startContent = values.description;
                        editorRef.current = editor;
                    }}
                    initialValue={''}


                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={(newValue, editor) => { }}
                />
            </div>
        </div>
    )
}



// const CreateTaskForm = withFormik({

//     //thiếu enableReinitialize thì các values sẽ ko cập nhật lên các field
//     //của formik
//     enableReinitialize: true,

//     mapPropsToValues: (props) => {
//         //console.log('propValues', props);
//         // const { projectEdit } = props;
//         // return {
//         //     id: projectEdit.id,
//         //     projectName: projectEdit.projectName,
//         //     description: projectEdit.description,
//         //     categoryId: projectEdit.categoryId
//         // }
//     },

//     // Custom sync validation
//     validationSchema: Yup.object().shape({

//     }),

//     handleSubmit: (values, { props, setSubmitting }) => {
//         //console.log(values);

//     },

//     displayName: 'CreateTaskForm',
// })(FormCreateTask);




// export default connect()(CreateTaskForm);