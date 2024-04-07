import { useEffect, useReducer } from 'react';
import InputSection from './components/InputSection/InputSection';
import ItemList from './components/ItemsSection/ItemsList';
import { Heading, Button, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import taskReducer from './functions/taskReducer';
import './App.css';

function App() {
  const [tasks, dispatch] = useReducer(
    taskReducer,
    JSON.parse(localStorage.getItem('tasks')) || []
  );

  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTaskHandler = (task) => {
    dispatch({
      type: 'add',
      task: task,
      id: uuidv4(),
    });
  };

  const removeTaskHandler = (id) => {
    dispatch({
      type: 'remove',
      id: id,
    });
  };

  const onDoneHandler = (id) => {
    dispatch({
      type: 'done',
      id: id,
    });
  };

  return (
    <motion.div
      className='App'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeOut', duration: 1.5 }}
    >
      <Heading size='xl' fontSize='38px'>
        What I should to do
      </Heading>
      <InputSection onAddTask={addTaskHandler} />
      <ItemList
        tasks={tasks}
        onRemove={removeTaskHandler}
        onDone={onDoneHandler}
      />
      <motion.div whileTap={{ scale: 0.8 }}>
        <Button variant='outline' onClick={toggleColorMode}>
          {colorMode === 'light' ? (
            <MoonIcon boxSize={4} />
          ) : (
            <SunIcon boxSize={4} />
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default App;
