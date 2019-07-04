import React from 'react'
import { Button, Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
export default function index(props)  {
    
   
    
    
        return (
                    <Form onSubmit={()=>{this.props.sendvalue(this.props.data)}} style={{color:"white"}}>
                        <Form.Group controlId="formBasic">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title of Image" onChange={props.getTitle} />
                        </Form.Group>

                        <Form.Group controlId="formBasic">
                            <Form.Label>Subtitle</Form.Label>
                            <Form.Control type="input" placeholder="Enter subtitle of Image" onChange={props.getSubTitle} />
                        </Form.Group>

                        <Form.Group controlId="formBasic">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="input" placeholder="Enter Description of Image" onChange={props.getDescription} />
                        </Form.Group>

                        <Form.Group controlId="formBasic">
                            <Form.Label>Select Image</Form.Label>
                            <Form.Control type="file" placeholder="SelectImage" onChange={props.getImage}/>
                        </Form.Group>
                        <Link to="/"><Button variant="primary" type="submit" onClick={()=>{props.sendvalue()}}>Submit</Button></Link>
                    </Form>
              
        );
    
}

