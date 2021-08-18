import React, { useState, useEffect } from 'react';
import {Row, Col, Nav} from 'react-bootstrap';
import HomePageContext from './home-page-context';
import URLInput from './url-input';
import URLHistory from './url-history';
import WordTable from './word-table';

const HomePage = () => {
    const [url, setUrl] = useState('');
    const [curTab, setCurTab] = useState('');
    const [urlInputDisplay, setUrlInputDisplay] = useState({display: 'block'});
    const [urlHistoryDisplay, setUrlHistoryDisplay] = useState({display: 'none'});

    useEffect(() => {
        if (url) {
            console.log('url: ', url);
        }
    }, [url]);

    useEffect(() => {
        if (curTab === 'url-input') {
            setUrlInputDisplay({display: 'block'});
            setUrlHistoryDisplay({display: 'none'});
        } else if (curTab === 'url-history') {
            setUrlInputDisplay({display: 'none'});
            setUrlHistoryDisplay({display: 'block'});
        }
    }, [curTab]);
    

    return (
        <HomePageContext
            url={url}
            setUrl={setUrl}
        >
            <div className="url-select">
                <Nav
                    fill variant="tabs" defaultActiveKey="url-input" onSelect={(selectedKey) => setCurTab(selectedKey)}
                    >
                    <Nav.Item>
                        <Nav.Link eventKey="url-input">Input new url</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="url-history">Browse past urls</Nav.Link>
                    </Nav.Item>
                </Nav>
                
                <Row style={{textAlign: 'center', margin: 'auto'}}>
                    <Col style={urlInputDisplay}>
                        <URLInput url={url} setUrl={setUrl} />
                    </Col>
                    <Col style={urlHistoryDisplay}>
                        <URLHistory />
                    </Col>
                </Row>
            </div>
            <WordTable />
        </HomePageContext>
    )
}

export default HomePage;