// or use TypeScript
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import Task from '../Task/Task.component'
import { updateTaskState } from '../../lib/store'

const TaskList = () => {
  // We're retrieving our state from the store
  const tasks = useSelector(state => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter(t => t.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter(t => t.state !== 'TASK_PINNED')
    ]
    const filteredTasks = tasksInOrder.filter(
      t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    )

    return filteredTasks
  })
  const { status } = useSelector(state => state.taskbox)

  const dispatch = useDispatch()
  const pinTask = value => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED' }))
  }
  const archiveTask = value => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED' }))
  }

  const LoadingRow = (
    <div className='loading-item'>
      <span className='glow-checkbox' />
      <span className='glow-text'>
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  )

  if (status === 'loading') {
    return (
      <div className='list-items' data-testid='loading' key={'loading'}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    )
  }
  if (tasks.length === 0) {
    return (
      <div className='list-items' data-testid='empty' key={'empty'}>
        <div className='wrapper-message'>
          <span className='icon-check' />
          <p className='title-message'>You have no tasks</p>
          <p className='subtitle-message'>Sit back and relax</p>
        </div>
      </div>
    )
  }

  return (
    <div className='list-items'>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onPinTask={task => pinTask(task)}
          onArchiveTask={task => archiveTask(task)}
        />
      ))}
    </div>
  )
}

TaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  onPinTask: PropTypes.func,
  onArchiveTask: PropTypes.func
}
TaskList.defaultProps = {
  loading: false
}

export default TaskList
