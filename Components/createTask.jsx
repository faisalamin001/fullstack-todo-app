import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function CreateTask() {
  const router = useRouter();
  const [name, setname] = useState('');

  const createUserHandler = async (e) => {
    e.preventDefault();
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/createUser`,
      {
        method: 'POST',
        body: JSON.stringify({
          name,
          email: 'example@gmail.com',
        }),
      }
    );
    console.log(data.json());
    router.reload(window.location.pathname);
  };

  return (
    <div className='creatediv'>
      <h1>Fullstack Todo app</h1>
      <form>
        <input
          placeholder='todo...'
          type='text'
          onChange={(e) => setname(e.target.value)}
        />{' '}
        <button onClick={createUserHandler}> Add </button>
      </form>
    </div>
  );
}

export default CreateTask;
