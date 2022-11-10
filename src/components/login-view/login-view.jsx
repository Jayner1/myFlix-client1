import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be 5 or more characters');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 or more characters');
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myflix14.herokuapp.com/login', {
        Username: username,
        Password: password,
    })
    .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
    }) 
    .catch(e => {
        console.log('no such user')
    });
    };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}