import React from 'react';

export default function PageNotFound(props) {
    return <div className='container text-center text-danger' style={{ fontSize: '2rem' }}>404! Không tìm thấy trang {props.match.url}</div>;
}
