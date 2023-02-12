import React, { useEffect, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';

function ShowAllTasks() {
  const [tasks, setTasks] = useState([]);

  //fetch all tasks from postgresql database
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`)
      .then((res) => res.json())
      .then((result) => setTasks(result));
  }, []);

  const deleteHandler = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteUser/${id}`)
      .then((res) => res.json())
      .then((result) => console.log(result));
  };

  const editHandler = () => {
    console.log('edit');
  };

  return (
    <div className='showdiv'>
      {tasks
        ? tasks.map((user) => (
            <div className='task' key={user.id}>
              <div>
                <span>{user.id} . </span> {user.name}
              </div>
              <div>
                {' '}
                <span className='edit'>
                  <BsPencilSquare onClick={() => editHandler} />
                </span>{' '}
                <span className='del'>
                  <MdDeleteForever onClick={() => deleteHandler(user.id)} />
                </span>
              </div>
            </div>
          ))
        : 'Loading...'}
    </div>
  );
}

export default ShowAllTasks;
