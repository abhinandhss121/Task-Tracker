import React, { useState, useMemo, useEffect } from 'react';
import './TaskFlow.css';
import api from '../api/axios'; // Import the axios instance

const TaskFlow = () => {
  // State for tasks and modal
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Low',
    dueDate: '',
    completed: false
  });

  // API call to create a task
  const createTaskAPI = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error.response?.data?.message || 'Failed to create task';
    }
  };

  // API call to get all tasks
  const getTasksAPI = async () => {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      console.error('Get tasks error:', error);
      throw error.response?.data?.message || 'Failed to fetch tasks';
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const response = await getTasksAPI();
        if (response.success) {
          setTasks(response.tasks);
        }
      } catch (err) {
        setError(err.message || 'Failed to load tasks');
        console.error('Error loading tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Calculate priority counts
  const priorityCounts = useMemo(() => {
    const counts = { High: 0, Medium: 0, Low: 0 };
    tasks.forEach(task => {
      if (Object.prototype.hasOwnProperty.call(counts, task.priority)) {
        counts[task.priority]++;
      }
    });
    return counts;
  }, [tasks]);

  // Calculate status counts (adapted to use completed field)
  const statusCounts = useMemo(() => {
    const counts = { 'Completed': 0, 'In Progress': 0 };
    tasks.forEach(task => {
      if (task.completed) {
        counts['Completed']++;
      } else {
        counts['In Progress']++;
      }
    });
    return counts;
  }, [tasks]);

  // Calculate time frame counts
  const timeFrameCounts = useMemo(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneWeekStr = oneWeekFromNow.toISOString().split('T')[0];

    let todayCount = 0;
    let thisWeekCount = 0;

    tasks.forEach(task => {
      const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
      if (taskDate === todayStr) {
        todayCount++;
      }
      if (taskDate >= todayStr && taskDate <= oneWeekStr) {
        thisWeekCount++;
      }
    });

    return { Today: todayCount, 'This Week': thisWeekCount };
  }, [tasks]);

  // Open modal function
  const openModal = () => {
    setIsModalOpen(true);
    setError('');
  };
  
  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
    setNewTask({
      title: '',
      description: '',
      priority: 'Low',
      dueDate: '',
      completed: false
    });
    setError('');
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask({
      ...newTask, 
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      const response = await createTaskAPI(newTask);
      
      if (response.success) {
        setTasks([response.task, ...tasks]);
        closeModal();
      }
    } catch (err) {
      setError(err);
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="task-flow-container">
      <header>
        <h1>TaskTracker</h1>
        <button className="create-task-btn" onClick={openModal}>
          Create New Task
        </button>
      </header>

      {error && (
        <div className="error-message" style={{
          backgroundColor: '#fee',
          color: '#c33',
          padding: '10px',
          borderRadius: '4px',
          margin: '10px 0'
        }}>
          {error}
        </div>
      )}

      <div className="task-overview">
        <h2>Task Overview</h2>
        <p>Manage your tasks efficiently</p>
        <div className="task-stats">
          <div className="stat-item">
            <span className="stat-number">{tasks.length}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{statusCounts['Completed']}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{statusCounts['In Progress']}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>
      </div>

      <div className="task-categories">
        <div className="category">
          <h3>Task Priority</h3>
          <ul>
            <li className="priority-item high">
              <span>High Priority</span>
              <span className="count">{priorityCounts.High}</span>
            </li>
            <li className="priority-item medium">
              <span>Medium Priority</span>
              <span className="count">{priorityCounts.Medium}</span>
            </li>
            <li className="priority-item low">
              <span>Low Priority</span>
              <span className="count">{priorityCounts.Low}</span>
            </li>
          </ul>
        </div>

        <div className="category">
          <h3>Time Frame</h3>
          <ul>
            <li className="time-item">
              <span>Today</span>
              <span className="count">{timeFrameCounts.Today}</span>
            </li>
            <li className="time-item">
              <span>This Week</span>
              <span className="count">{timeFrameCounts['This Week']}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Task List */}
      <div className="task-list">
        {loading && <div className="loading">Loading tasks...</div>}
        {tasks.length === 0 && !loading ? (
          <div className="no-tasks">
            <p>No tasks yet. Create your first task to get started!</p>
          </div>
        ) : (
          tasks.map(task => (
            <div key={task._id} className={`task-card priority-${task.priority.toLowerCase()}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-meta">
                <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                  {task.priority} Priority
                </span>
                <span className="due-date">Due: {formatDate(task.dueDate)}</span>
                <span className={`status-badge ${task.completed ? 'completed' : 'in-progress'}`}>
                  {task.completed ? 'Completed' : 'In Progress'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for creating new task */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Task</h2>
            {error && (
              <div className="error-message" style={{
                backgroundColor: '#fee',
                color: '#c33',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '15px'
              }}>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  placeholder="Add details about your task"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    name="priority"
                    value={newTask.priority}
                    onChange={handleInputChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Status</label>
                <div className="status-options">
                  <label>
                    <input
                      type="checkbox"
                      name="completed"
                      checked={newTask.completed}
                      onChange={handleInputChange}
                    />
                    Mark as completed
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={closeModal} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFlow;
