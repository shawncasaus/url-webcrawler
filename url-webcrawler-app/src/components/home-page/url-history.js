import React from 'react';
import {Table, Pagination} from 'react-bootstrap';

const URLHistory = () => {
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
    }
    

    return (
        <div className="past-urls-table">
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>URL</th>
                    <th>Date Created</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>www.google.com</td>
                    <td>22/5/2021</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>www.yahoo.com</td>
                    <td>2/6/2021</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td>www.bing.com</td>
                    <td>15/7/2021</td>
                    </tr>
                    <tr>
                    <td>4</td>
                    <td>www.youtube.com</td>
                    <td>18/7/2021</td>
                    </tr>
                    <tr>
                    <td>5</td>
                    <td>www.uk.gov</td>
                    <td>8/8/2021</td>
                    </tr>
                </tbody>
            </Table>
            <div className='url-history-pagination'>
                <Pagination >{items}</Pagination>
            </div>
        </div>
    )
}

export default URLHistory;