import { useContext, useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { TasksDispatchContext } from '../../context/tasksContext';
import { v4 as uuidv4 } from 'uuid';
import styles from './InputSection.module.css';

const InputSection = () => {
  const [enteredText, setEnteredText] = useState('');
  const [error, setError] = useState('');
  const dispatch = useContext(TasksDispatchContext);

  const onAddHandler = () => {
    if (enteredText.length > 0 && enteredText.length <= 20) {
      dispatch({
        type: 'add',
        task: enteredText,
        id: uuidv4(),
      });
      setEnteredText('');
      setError('');
    } else {
      setError('Text must be between 1 and 20 characters');
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  return (
    <>
      <div className={styles.inputSection}>
        <Input
          className={styles.input}
          onChange={(e) => setEnteredText(e.target.value)}
          value={enteredText}
          max={20}
        />
        <motion.div whileTap={{ scale: 0.8 }}>
          <Button colorScheme='teal' variant='solid' onClick={onAddHandler}>
            <AddIcon boxSize={4} />
          </Button>
        </motion.div>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default InputSection;
