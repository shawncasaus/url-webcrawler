import React from 'react';
import {Table, Pagination} from 'react-bootstrap';

const WordTable = () => {
    let active = 2;
    let items = [];
    for (let number = 1; number <= 3; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
    }
    

    return (
        <div className="words-table">
            <h1>Words found:</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Word</th>
                    <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Hello</td>
                    <td>3</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>World</td>
                    <td>2</td>
                    </tr>
                </tbody>
            </Table>
            <div className='url-history-pagination'>
                <Pagination >{items}</Pagination>
            </div>
        </div>
    )
}

export default WordTable;