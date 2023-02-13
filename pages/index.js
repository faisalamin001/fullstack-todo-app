import React, { useEffect, useState } from 'react';
import CreateTask from '../Components/createTask';
import ShowAllTasks from '../Components/allTasks';

export default function Home() {
  const [name, setname] = useState('');
  const [btnName, setBtnName] = useState('Add');

  return (
    <>
      <CreateTask
        name={name}
        btnName={btnName}
        setBtnName={setBtnName}
        setname={setname}
      />
      <ShowAllTasks
        name={name}
        setname={setname}
        btnName={btnName}
        setBtnName={setBtnName}
      />
    </>
  );
}
