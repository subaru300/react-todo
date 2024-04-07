import { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import styles from './InputSection.module.css';

const InputSection = ({ onAddTask }) => {
  const [enteredText, setEnteredText] = useState('');
  const [error, setError] = useState('');

  const onAddHandler = () => {
    if (enteredText.length > 0 && enteredText.length <= 20) {
      onAddTask(enteredText);
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
