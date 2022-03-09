import React, { useRef, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Button, Radio } from 'antd';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setNestedObjectValues, withFormik } from 'formik';
import * as Yup from 'yup';
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/types/CyberBugs/CyberBugsTypes';
import parse from 'html-react-parser';

function CreateProject(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;

    const dispatch = useDispatch();

    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);

    const renderProjectCategory = () => {
        return arrProjectCategory.map((item, index) => {

            let option = index === 0 ? <option key={index} value={item.id} defaultChecked>{item.projectCategoryName}</option> : <option key={index} value={item.id}>{item.projectCategoryName}</option>;
            return option;

        });
    }

    useEffect(() => {
        //gọi API lấy dữ liệu và dispatch lên ProjectCategorySaga
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA,
            data: 'project category data'
        })
    }, [])



    const handleEditorChange = (content, editor) => {
        //console.log('component props: ', props);
        //function setFieldValue của formik, parse description thành html (html-react-parser)
        //setFieldValue('description', parse(content));
        setFieldValue('description', content);
    }



    return (
        <div className='container m-5'>
            <h3>Create project</h3>
            <form className='container' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="projectName" >Name</label>
                    <input type="text" name='projectName' className='form-control' onChange={handleChange} />
                    <div>
                        <span className='text-danger'>{errors.projectName}</span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description" >Description</label>
                    <Editor
                        name='description'
                        initialValue=""
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
                        onEditorChange={handleEditorChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="categoryId" >Category</label>
                    <select name='categoryId' className='form-control' onChange={handleChange}>
                        {renderProjectCategory()}
                    </select>
                </div>
                <Button type="primary" htmlType='submit'>
                    Create project
                </Button>

            </form>
        </div>
    )
}

const CreateProjectForm = withFormik({

    enableReinitialize: true,
    mapPropsToValues: (props) => {

        //console.log('propValues', props);

        return {
            projectName: '',
            description: '',
            categoryId: props.arrProjectCategory[0]?.id
        }
    },

    // Custom sync validation
    validationSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        //console.log(values);
        props.dispatch({
            type: CREATE_PROJECT_SAGA,
            newProject: values
        })
    },

    displayName: 'CreateProjectFormik',
})(CreateProject);

//vì connect() bọc CreateProjectForm nên có các props của CreateProjectForm và CreateProject,
//giá trị mặc định cho categoryId cần lấy từ ProjectCategoryReducer.arrProjectCategory
//nhưng vì formik CreateProjectForm bọc CreateProject nên ko xài redux lấy về được
//vậy ta dùng mapStateToProps để đưa prop arrProjectCategory vào formik CreateProjectForm
const mapStateToProps = state => {
    return {
        arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
    }
}

export default connect(mapStateToProps)(CreateProjectForm);