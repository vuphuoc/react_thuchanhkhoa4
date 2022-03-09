import React from 'react'

export default function Pagination(props) {

    const { currentPage, totalPage, ...rest } = props;


    console.log(currentPage);


    const renderPage = () => {

        const pageItemList = [];

        for (let page = 1; page <= totalPage; page++) {

            pageItemList.push(<li key={page} className={page == currentPage ? 'page-item active' : 'page-item'}><a className="page-link" href="#">{page}</a></li>);

        }

        return <ul className="pagination">
            <li className='page-item'><a className="page-link" href="#">Previous</a></li>
            {pageItemList}
            <li className='page-item'><a className="page-link" href="#">Next</a></li>
        </ul>



    }

    return (
        <nav aria-label="Page navigation example">
            {renderPage()}
        </nav>

    )
}
