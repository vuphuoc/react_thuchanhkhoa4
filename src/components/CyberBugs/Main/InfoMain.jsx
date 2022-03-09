import React from 'react'
import Parser from 'html-react-parser'


export default function InfoMain(props) {

    const { projectDetail } = props;

    //console.log(projectDetail);

    const renderAvatar = () => {
        return projectDetail?.members?.map((item, index) => {
            return <div className="avatar" key={index}>
                <img src={item.avatar} alt={item.name} />
            </div>
        })
    }

    return (
        <>
            <h3>{projectDetail?.projectName}</h3>
            <section>
                {Parser(projectDetail?.description)}
            </section>
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search"></i>
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    {renderAvatar()}
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </>


    )
}
