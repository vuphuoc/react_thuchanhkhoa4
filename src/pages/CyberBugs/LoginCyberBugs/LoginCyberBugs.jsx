import React from 'react'
import { Input, Tooltip, Button } from 'antd';
import { InfoCircleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';
import './LoginCyberBugs.scss';
import { withFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { USER_SIGNIN_API } from '../../../redux/types/CyberBugs/CyberBugsTypes';
import { signInCyberBugsAction } from '../../../redux/actions/CyberBugsActions';


const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

function LoginCyberBugs(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight }}>
                <div>
                    <h3 className='text-center my-5'>Login CyberBugs</h3>
                    <div className='mt-3'>
                        <Input
                            placeholder="Email"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            type='email'
                            name='email'
                            onChange={handleChange}
                        />
                        <div>
                            <span className='text-danger'>{errors.email}</span>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <Input
                            type='password'
                            placeholder="Password"
                            prefix={<LockOutlined />}
                            name='password'
                            onChange={handleChange}
                        />
                        <div>
                            <span className='text-danger'>{errors.password}</span>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <Button htmlType='submit' type="primary" block={true} style={{ backgroundColor: '#6675fb', borderColor: '#6675fb' }}>Sign in</Button>
                    </div>
                    <div className="social mt-3 d-flex justify-content-center">
                        <Button type="primary" shape="circle" icon={<IconFont type="icon-facebook" />}>

                        </Button>
                        <Button type="primary" shape="circle" icon={<IconFont type="icon-twitter" />}>

                        </Button>
                    </div>
                </div>


            </div>

        </form>
    )
}

const LoginCyberBugsWithFormik = withFormik({
    //các field lấy value
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),

    // Custom sync validation
    // validate: values => {
    //     const errors = {};

    //     if (!values.email) {
    //         errors.email = 'Email is invalid';
    //     }

    //     return errors;
    // },

    validationSchema: Yup.object().shape({
        //validate form field
        email: Yup.string().required('Email is required!').email('Email is invalid!'),
        password: Yup.string().min(6, 'Password length require 6-32 characters!').max(32, 'Password length require 6-32 characters!')
    }),


    handleChange: (e) => {
        const { name, value } = e.target;
        console.log(`name: ${name}, value: ${value}`);
    },

    handleSubmit: (values, { props, setSubmitting }) => {

        // let action = {
        //     type: USER_SIGNIN_API,
        //     userLogin: {
        //         email: values.email,
        //         password: values.password
        //     }
        // };

        props.dispatch(signInCyberBugsAction(values.email, values.password));
    },

    displayName: 'Login CyberBugs',
})(LoginCyberBugs);



export default connect()(LoginCyberBugsWithFormik);
