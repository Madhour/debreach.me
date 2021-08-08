import { ReactComponent as Logo } from '../logo.svg';
import React from 'react'
import SyntaxHighLighter from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function ApiDoc() {
    return (
        <div>
            <div className={`App-header`}>
                <Logo className="d-block mx-auto img-fluid" style={{ width: '800px', align: 'center' }} />
            </div>
            <div className='Api-body'>
                <h1>DEBREACH.ME API</h1>

                <span>
                    A lightweight API to check for breached passwords in your application! <br/><br/>
                </span>

                <SyntaxHighLighter language="bash" style={gruvboxDark}>
                    {
                        'https://api.debreach.me/passwords/<sha1-Hash>'
                    }
                </SyntaxHighLighter>
                

                <span>
                    The API accepts only uppercase letters, and returns a simple JSON-Object with the status (Breached/Unbreached):<br/><br/>
                </span>

                <SyntaxHighLighter language="JSON" style={gruvboxDark}>
                    {
                        `{"breached": "true"}`
                    }
                </SyntaxHighLighter>

                <span>
                    Currently, it queries a Database with 80.000+ of the most common breached passwords.<br/><br/>
                </span>
                

            </div>
        </div>
    )
}
