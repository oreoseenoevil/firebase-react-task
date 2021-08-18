import React, { useEffect, useState } from 'react';

import Tasks from './Components/Tasks/Tasks';
import NewTask from './Components/NewTask/NewTask';
import { API_URL } from './Keys';
import { useHttp } from './Hooks';

function App() {
  const [tasks, setTasks] = useState([]);

  const { fetchAPI: fetchTasks, isLoading, error } = useHttp()

  useEffect(() => {
    const newData = (tasksObj) => {
      const newTasks = []

      for (const key in tasksObj) {
        newTasks.push({
          id: key,
          text: tasksObj[key].text
        })
      }

      setTasks(newTasks)
    }

    fetchTasks({
      url: API_URL,
      method: 'GET',
      headers: null,
      body: null
    }, newData)

  }, [fetchTasks])

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
