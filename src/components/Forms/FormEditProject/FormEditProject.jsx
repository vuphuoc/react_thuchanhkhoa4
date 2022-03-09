import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { GET_ALL_PROJECT_CATEGORY_SAGA, UPDATE_PROJECT_SAGA } from '../../../redux/types/CyberBugs/CyberBugsTypes';

function FormEditProject(props) {

    /*"id": 0,
      "projectName": "string",
      "creator": 0,
      "description": "string",
      "categoryId": "string" */

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

            let option = <option key={index} value={item.id}>{item.projectCategoryName}</option>;
            return option;

        });
    }

    const editorRef = useRef(null);

    // const submitForm = (e) => {
    //     e.preventDefault();
    //     alert('submit edit form');
    // }

    //componentDidMount
    useEffect(() => {

        //gọi API lấy dữ liệu và dispatch lên ProjectCategorySaga
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA,
            data: 'project category data'
        })

        //dispatch lên Reducer function callBackSubmit = handleSubmit của formik
        //ngay khi component được load
        dispatch({
            type: 'SET_SUBMIT_EDIT_PROJECT',
            submitFunction: handleSubmit
        })
    }, [])



    const handleEditorChange = (content, editor) => {

        //function setFieldValue của formik, parse description thành html (html-react-parser)
        //setFieldValue('description', parse(content));
        setFieldValue('description', content);
    }


    return (
        <form className='container-fluid' onSubmit={handleSubmit}>
            <div className="row">

                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="id" className='font-weight-bold'>Id</label>
                        <input type="text" name='id' className='form-control' value={values.id} disabled />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="projectName" className='font-weight-bold'>Project name</label>
                        <input type="text" name='projectName' className='form-control' value={values.projectName} onChange={handleChange} />
                        <div>
                            <span className='text-danger'>{errors.projectName}</span>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="categoryId" className='font-weight-bold'>Category</label>
                        <select name='categoryId' className='form-control' onChange={handleChange} value={values.categoryId}>
                            {renderProjectCategory()}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="description" className='font-weight-bold'>Description</label>
                        <Editor
                            name='description'
                            onInit={(evt, editor) => {
                                console.log(editor);
                                //editorRef.current.startContent = values.description;
                                editorRef.current = editor;
                            }}
                            initialValue={values.description}


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
                            onEditorChange={(newValue, editor) => values.description = newValue}
                        />
                    </div>
                </div>
            </div>



        </form>
    )
}

const EditProjectForm = withFormik({

    //thiếu enableReinitialize thì các values sẽ ko cập nhật lên các field
    //của formik
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        //console.log('propValues', props);
        const { projectEdit } = props;
        return {
            id: projectEdit.id,
            projectName: projectEdit.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId
        }
    },

    // Custom sync validation
    validationSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        //console.log(values);
        //Khi người dùng bấm submit thì đưa dữ liệu từ FE về BE qua service
        const action = {
            type: UPDATE_PROJECT_SAGA,
            projectUpdate: values
        };

        //formik ko xài được useDispatch (vì là class component)
        //nên ta cần mapDispatchToProp và gọi dispatch ra
        //dispatch(action);
        props.dispatch(action);
    },

    displayName: 'EditProjectForm',
})(FormEditProject);

const mapStateToProps = state => {
    return {
        //lấy projectEdit từ reducer về       
        projectEdit: state.ProjectReducer.projectEdit
    }
}


export default connect(mapStateToProps)(EditProjectForm)