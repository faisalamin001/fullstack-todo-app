import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function CreateTask({ name, setname, btnName, setBtnName }) {
  const router = useRouter();

  const updateUserHandler = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/updateUser/${id}`, {
      method: 'POST',
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    console.log('update handler', name);
    setname('');
  };

  const createUserHandler = async (e) => {
    e.preventDefault();
    console.log('create handler');
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

  if (name === '') {
    setBtnName('Add');
  }

  return (
    <div className='creatediv'>
      <h1>Fullstack Todo app</h1>
      <form>
        <input
          placeholder='todo...'
          type='text'
          value={name}
          onChange={(e) => setname(e.target.value)}
        />{' '}
        <button
          onClick={btnName === 'Add' ? createUserHandler : updateUserHandler}
        >
          {' '}
          {btnName}{' '}
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
