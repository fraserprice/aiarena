import * as React from 'react';
import {Redirect} from 'react-router-dom';

const logout = () => {
  localStorage.removeItem('token');
  return (
    <Redirect to={{ pathname: '/' }}/>
  );
}

export default logout;
