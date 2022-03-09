import React from 'react';

export default function Deatail(props) {
    return <div>
        Giá trị tham số: {props.match.params.id}
        <hr />
        Path name hiện tại: {props.match.path}
        <hr />
        url hiện tại: {props.match.url}
    </div>;
}
