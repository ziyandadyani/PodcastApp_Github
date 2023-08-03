import { useState } from 'react';
import SignIn from './signin';
import SignUp from './signup';

const Login = () => {
  const [currentForm, setCurrentForm] = useState('register');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <>
      {currentForm === 'register' ? (
        <SignUp onFormSwitch={toggleForm} />
      ) : (
        <SignIn onFormSwitch={toggleForm} />
      )}
    </>
  );
}

export default Login
