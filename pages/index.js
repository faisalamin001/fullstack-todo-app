import React, { useEffect, useState } from 'react';
import CreateTask from '../Components/createTask';
import ShowAllTasks from '../Components/allTasks';

export default function Home() {
  return (
    <>
      <CreateTask />
      <ShowAllTasks />
    </>
  );
}
