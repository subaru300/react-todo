import { Button } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { TasksContext, TasksDispatchContext } from '../../context/tasksContext';
import styles from './ItemsList.module.css';

const ItemList = () => {
  const tasks = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);

  return (
    <ul className={styles.ul}>
      {tasks.map((task) => {
        return (
          <motion.div
            key={task.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeOut', duration: 2 }}
          >
            <li className={styles.task}>
              <span className={`${task.isDone ? styles.done : ''}`}>
                {task.task}
              </span>
              <div>
                <Button
                  variant='ghost'
                  onClick={() => {
                    dispatch({
                      type: 'done',
                      id: task.id,
                    });
                  }}
                >
                  <CheckIcon boxSize={4} />
                </Button>
                <Button
                  variant='ghost'
                  onClick={() => {
                    dispatch({
                      type: 'remove',
                      id: task.id,
                    });
                  }}
                >
                  <DeleteIcon boxSize={4} />
                </Button>
              </div>
            </li>
          </motion.div>
        );
      })}
    </ul>
  );
};

export default ItemList;
