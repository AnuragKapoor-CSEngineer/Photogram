import React from 'react'
import { Navbar,Nav,Button,Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
export default function index(props)  {
    
      return (
            <div style={{marginBottom:"3rem"}}>
                <Navbar bg="primary" variant="primary" >
                    <Link to="/"><Button variant="outline-light">Home</Button></Link>
                    <Nav className="mr-auto">
                        <Nav.Link ></Nav.Link>
                        <Nav.Link ></Nav.Link>
                        <Nav.Link ></Nav.Link>
                    </Nav>
                    <Form inline>
                        
                       
                       <Link to="/upload"><Button variant="outline-light" as="input" type="button" value="Upload"  disabled={props.buttonfunction}/></Link>
                       <Link to="/"><Button as="input" type="button" value={props.buttonValue} variant="outline-light" onClick={props.buttonfunction ? props.googleLogin: props.logout}  /></Link>
                    </Form>
                </Navbar>
            </div>
        )
    }

