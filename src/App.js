import { useEffect, useReducer } from 'react';
import InputSection from './components/InputSection/InputSection';
import ItemList from './components/ItemsSection/ItemsList';
import { Heading, Button, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import taskReducer from './functions/taskReducer';
import { TasksContext, TasksDispatchContext } from './context/tasksContext';
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

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
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
          <InputSection />
          <ItemList />
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
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export default App;
