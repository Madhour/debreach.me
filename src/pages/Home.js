import { ReactComponent as Logo } from '../logo.svg';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, Component } from 'react';
import sha1 from 'sha1';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExports from '../aws-exports';
import { getHash } from '../graphql/queries';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Row, Container, FormControl, InputGroup, Spinner} from 'react-bootstrap';
import breached from '../img/breached.svg';
import { cloneDeepWithoutLoc } from '@babel/types';




Amplify.configure(awsExports);

export default function Home() {
    const [HashResults, setHashResults] = useState(0);
    const [breachedStatus, setBreachedStatus] = useState(null);
    const [password, setPassword] = useState("password")
    const [loading, setLoading] = useState(false)
    var sha1 = require('sha1');
    
    async function fetchHash(val) {
        setLoading(true)
        setBreachedStatus(null)
        try {
            const pwHash = await API.graphql(graphqlOperation(getHash, { pwhash: val.toUpperCase() }))
            const HashResults = pwHash.data.getHash.items.length
            setHashResults(HashResults)
            updateStatus(HashResults)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }

    /* example using the debreach api
    
    function fetchHashApi(val) {
        var ApiUrl = "https://api.debreach.me/passwords/" + val
        try {
            httpGetAsync(ApiUrl, function (data) {
                const pwStatus = JSON.parse(data).breached
                setHashResults(pwStatus)
                updateStatus(pwStatus)
            })
        } catch (err) {
            console.log(err)
        }
    }
    */

    async function updateStatus(results) {
        if (results == 0) {
            const breachedStatus = "Clear"
            setBreachedStatus(breachedStatus)
        } else {
            const breachedStatus = "Critical"
            setBreachedStatus(breachedStatus)
        }
    }

    function getData(val) {
        setPassword(val.target.value)
    }


    return (
        <div>
            <div className={`App-header ${breachedStatus}`}>
                <Logo className="d-block mx-auto img-fluid" style={{ width: '800px', align: 'center' }} />
            </div>
            <div className='App-body'>
                <span>Find out if  your password was compromised in a data breach!</span>
                {/*<Container fluid="md">
                    <Row>
                        <Col>
                            <input type="password" onChange={getData} placeholder="Password" />
                        </Col>
                        <Col>
                            <Button onClick={() => fetchHash(sha1(password))} variant="secondary">Check</Button>
                        </Col>
                    </Row>
    </Container>*/}
                <Container >
                <Row className="justify-content-md-center">
                <Col xs={12} md={8}>
                <InputGroup className="mt-3 mb-3">
                    <FormControl
                        placeholder="Password"
                        type="password"
                        onChange={getData}
                    />
                    <Button onClick={() => fetchHash(sha1(password))} variant="outline-secondary" id="button-addon2">
                        Check
                    </Button>
                </InputGroup>
                </Col>
                </Row>
                </Container>
                <h2>Status: {loading ? <Spinner animation='border'/>:breachedStatus}</h2>
            </div>
        </div>

    )
}