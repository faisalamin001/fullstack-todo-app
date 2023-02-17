import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateTask({ name, setname, btnName, setBtnName, taskId }) {
  const queryClient = useQueryClient();

  const updateRequest = async () => {
    return fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateUser/${taskId}`,
      {
        method: 'POST',
        body: JSON.stringify({ name }),
      }
    ).then((res) => res.json());
  };

  const updateTask = useMutation(() => updateRequest(), {
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const createTask = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createUser`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        email: 'example@gmail.com',
      }),
    });
  };
  const createUser = useMutation(() => createTask(), {
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const updateCreateHandler = (e) => {
    e.preventDefault();
    if (name === '') {
      return toast.warn('Required field must be filled!', {
        position: toast.POSITION.TOP_RIGHT,
        theme: 'dark',
        closeButton: false,
      });
    }
    btnName === 'Add'
      ? (createUser.mutate(),
        toast.success('Creating Task... ', {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: 'dark',
          closeButton: false,
        }))
      : (updateTask.mutate(),
        toast.success('Updating Task... ', {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: 'dark',
          closeButton: false,
        }));
    setname('');
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
        <button onClick={updateCreateHandler}> {btnName} </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateTask;
