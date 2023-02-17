import React, { useEffect, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShowAllTasks({ name, setname, btnName, setBtnName, settaskId }) {
  const queryClient = useQueryClient();

  const fetchTasks = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`).then((res) =>
      res.json()
    );
  };
  const deletetask = async (id) => {
    return fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteUser/${id}`
    ).then((res) => res.json());
  };

  const { isLoading, data, isError, error, refetch } = useQuery(
    'tasks',
    fetchTasks,
    {
      onSuccess: () => refetch(),
      refetchOnMount: false,
    }
  );
  const deleteTask = useMutation((id) => deletetask(id), {
    onSuccess: () => {
      queryClient.invalidateQueries();
      refetch();
    },
  });

  const editHandler = (user) => {
    setname(user.name);
    setBtnName('Update');
    settaskId(user.id);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>An error occured: {error}</h1>;

  return (
    <div className='showdiv'>
      {data
        ? data.map((user) => (
            <div className='task' key={user.id}>
              <div>
                <span>{user.id} . </span> {user.name}
              </div>
              <div>
                {' '}
                <span className='edit'>
                  <BsPencilSquare onClick={() => editHandler(user)} />
                </span>{' '}
                <span className='del'>
                  <MdDeleteForever
                    onClick={() => {
                      deleteTask.mutate(user.id);
                      toast.error('Deleting Task... ', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        theme: 'dark',
                        closeButton: false,
                      });
                    }}
                  />
                </span>
              </div>
            </div>
          ))
        : ''}
      <ToastContainer />
    </div>
  );
}

export default ShowAllTasks;
