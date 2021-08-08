import { ReactComponent as Logo } from '../logo.svg';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import sha1 from 'sha1';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExports from '../aws-exports';
import { getHash } from '../graphql/queries';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Row, Container, FormControl, InputGroup, Spinner, Card } from 'react-bootstrap';




Amplify.configure(awsExports);

export default function Home() {
    const [HashResults, setHashResults] = useState(0);
    const [breachedStatus, setBreachedStatus] = useState(null);
    const [password, setPassword] = useState("password")
    const [loading, setLoading] = useState(false)
    var sha1 = require('sha1');

    //Gets Hash as input, sets it to uppercase and queries the DB via GraphQL for matching entries
    async function fetchHash(val) {
        //The API call sets of a loading animation and resets the app background color (from green/red to purple)
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

    /* 
    //HTML requests
    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }

    //This function utilizes the debreach.me API instead of the GraphQL API to query the DB
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

    //Changes the breachedStatus depending on the DB-Query results (no entry=clear et vice versa)
    async function updateStatus(results) {
        if (results == 0) {
            const breachedStatus = "Clear"
            setBreachedStatus(breachedStatus)
        } else {
            const breachedStatus = "Critical"
            setBreachedStatus(breachedStatus)
        }
    }

    //Gets password from input field
    function getData(val) {
        setPassword(val.target.value)
    }


    return (
        <div>

            {
                // App-header changes color in css based on breachedStatus
            }
            <div className={`App-header ${breachedStatus}`}>
                <Logo className="d-block mx-auto img-fluid" style={{ width: '800px', align: 'center' }} />
            </div>

            <div className='App-body'>
                <span>Find out if  your password was compromised in a data breach!</span>
                <Container >

                    {
                        // Password is first hashed (sha1) and then passed to the fetchHash function
                    }
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

                {
                    //depending on the breachedStatus, a message will appear and the Card title with further information will be set to visible
                }
                <h2>Status: {loading ? <Spinner animation='border' /> : breachedStatus}</h2>
                <div className={`Breach-info ${breachedStatus}`}>
                    <Card border="secondary" style={{ width: '20rem', fontSize: '12px', color: 'black' }}>
                        <Card.Body>
                            <Card.Title>How to protect yourself!</Card.Title>
                            <Card.Text>
                                If you have used that password before then change it immediately.
                                To enhance your security, use a password manager.
                                For further information, check below:
                            </Card.Text>
                            <div className='text-center'>
                                <Button variant="outline-dark" href="https://privacytools.io/software/passwords/" >Privacytools.io</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>

    )
}