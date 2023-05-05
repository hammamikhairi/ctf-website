import { useRouter } from 'next/router';
import { useState } from 'react';

// const BASE_URL = "https://7b42-197-7-255-61.ngrok-free.app/"
const BASE_URL = "http://20.111.33.21/"
// const BASE_URL = "http://localhost:5051/"



function FlagForm({ level, playerId }) {
  const [flag, setFlag] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    fetch(`${BASE_URL}levelup?playerId=${playerId}&flag=${flag}&level=${level}`)
      .then(response => {
        if (response.ok) {
          router.push(`/level/level${parseInt(level) + 1}`);
        } else {
          setError('Incorrect flag. Please try again.');
        }
      })
      .catch(error => console.error('Error validating flag:', error));
  }

  return (
    <form className='level-form' onSubmit={handleSubmit}>
      <input type="text" id="flag" placeholder='FLAG' value={flag} onChange={event => setFlag(event.target.value)} /> <br />
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default FlagForm;