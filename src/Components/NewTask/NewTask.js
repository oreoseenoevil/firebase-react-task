import { useHttp } from '../../Hooks';
import { API_URL } from '../../Keys';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const { isLoading, error, fetchAPI } = useHttp()

  const createTask = (taskText, taskData) => {
    const generatedID = taskData.name
    const createdTask = {
      id: generatedID, text: taskText
    }

    props.onAddTask(createdTask)
  }

  const enterTaskHandler = async (taskText) => {
    fetchAPI({
      url: API_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        text: taskText
      }
    }, createTask.bind(null, taskText))
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
