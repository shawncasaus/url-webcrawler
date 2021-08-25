import React, {useState, useEffect} from 'react';
import {Table, Pagination} from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types'
import _ from 'lodash';
import moment from 'moment';

const URLHistory = ({setUrl}) => {
    const [urlList, setUrlList] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [curPag, setCurPag] = useState(1);

    const fetchUrl = 'http://localhost:5000/api/all-urls'; //used for backend call

    //calls backend to get past used urls
    useEffect(() => {        
        //preset axios options
        const options = {
            method: 'GET',
            mode: 'no-cors'
        };

        axios(fetchUrl, options).then(response => {
                setUrlList(response.data);
            }).catch (err => {
                console.error('Error: ', err);
                setError(true);
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    //handle loading and errors
    if (loading) return 'loading...';
    else if (error) return 'oops... something went wrong'

    //grabs body by mapping object call from backend
    const getBody = (list) => {
        console.log('list: ', list);
        let index = 0;
        return _.map(list, (item) => {
            index++;
            return <tr key={item.id}>
                <td>{index}</td>
                <td><a href="/#" onClick={() => {setUrl(item.url)}}>{item.url}</a></td>
                <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
            </tr>
        })
    }

    //handles pagination 
    const getItems = (cur, totalLength) => {
        let active = cur;

        let items = [];
        for (let number = 1; number <= Math.floor(totalLength / 5) + 1; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                {number}
                </Pagination.Item>,
            );
        }

        return items;
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
                {(urlList.undefined) ?
                    getBody(urlList.undefined)
                    : <tr colSpan="3"><p style={{textAlign: 'center', margin: 'auto'}}>oops... somethinf went wrong.</p></tr>
                }
                </tbody>
            </Table>
            <div className='url-history-pagination'>
                <Pagination >{getItems(curPag, 0)}</Pagination>
            </div>
        </div>
    )
}

URLHistory.defaultProps = {
    url: '',
    setUrl: () => {console.log('Error: setUrl not defined.')},
}

URLHistory.propTypes = {
    url: PropTypes.string,
    setUrl: PropTypes.func,
}

export default URLHistory;