import cookie from 'js-cookie';
import { useState } from 'react';


import cookies from 'next-cookies';

export async function getServerSideProps(context) {
  const { token } = cookies(context);

  if (token && context.req.url === '/login') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // If the user is logged in, continue to the requested page
  return { props: {} };
}


export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  console.log(cookie.get("token"))

  const handleLogin = async (e) => {
    e.preventDefault();


    // Send a request to the authentication server to check the credentials
    const response = await fetch('/api/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier }),
    });

    if (response.ok) {
      // If the credentials are valid, save the authentication token to a cookie
      const { token } = await response.json();
      cookie.set('token', token, { expires: 1 }); // Save the token to a cookie that expires in 1 day

      // Redirect to the home page
      window.location.href = '/';
    } else {
      // If the credentials are invalid, display an error message
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleLogin}>
        <div>
          <input placeholder='Identifier' type="password" id="password" className='level-form-input' value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
        </div>
        <button className='login-form-button' type="submit">Login</button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
}
