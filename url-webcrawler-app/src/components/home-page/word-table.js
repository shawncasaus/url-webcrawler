import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

import _ from 'lodash';
const WordTable = ({url}) => {
    const [enhancedUrl, setEnhancedUrl] = useState('');
    const [wordList, setWordList] = useState({});
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchUrl = 'http://localhost:5000/api/get-words/'; //used to fetch words
    const storeUrl = 'http://localhost:5000/api/store-url/'; //used to store url

    useEffect(() => {
        if(url) {
            setEnhancedUrl(url.replace(/\//, '@'));
            setIsDisplayed(true);
        }
    }, [url]);

    //stores url in db
    useEffect(() => {        
        //preset axios options
        const options = {
            method: 'POST',
            mode: 'no-cors'
        };
        
        axios(storeUrl + enhancedUrl, options).then(response => {
                console.log(response);
            }).catch (err => {
                console.error('Error: ', err);
            });
    }, [enhancedUrl]);

    //gets word count from db
    useEffect(() => {        
        //preset axios options
        const options = {
            method: 'GET',
            mode: 'no-cors'
        };
        
        axios(fetchUrl + enhancedUrl, options).then(response => {
                setWordList(response.data);
            }).catch (err => {
                console.error('Error: ', err);
            }).finally(() => {
                setLoading(false);
            });
    }, [enhancedUrl]);

        //grabs body by mapping object call from backend
        const getBody = (list) => {
            let index = 0;
            let array = [];
            for (const [key, value] of Object.entries(list)) {
                array.push({word: key, count: value});
              }

            return _.map(array, (item) => {
                index++;
                return <tr key={index}>
                    <td>{index}</td>
                    <td>{item.word}</td>
                    <td>{item.count}</td>
                </tr>
            })
        }

    //handle loading and errors
    if (loading) return 'loading...';

    return (
        <div className="words-table">
            {(isDisplayed) ?
            <div className="words-sub-table">
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
                {(wordList) ?
                    getBody(wordList)
                    : <tr colSpan="3"><p style={{textAlign: 'center', margin: 'auto'}}>oops... somethinf went wrong.</p></tr>
                }
                </tbody>
            </Table> 
            </div> :  <></>}
        </div>
    )
}

WordTable.defaultProps = {
    url: '',
  }

  WordTable.propTypes = {
    url: PropTypes.string,
  }

export default WordTable;