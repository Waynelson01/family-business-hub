import React, { useState } from 'react';

// Custom SVG icons
const DashboardIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

const ClockIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const BellIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const ChevronDownIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ChevronRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const PlusIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const EditIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const BusinessIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21h18" />
    <path d="M5 21V7l8-4v18" />
    <path d="M19 21V11l-6-4" />
  </svg>
);

const IdeaIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1Z" />
    <path d="M12 17c1.3 0 2.4-.3 3.4-.9.9-.6 1.6-1.5 1.6-2.6 0-1.1-.7-2-1.6-2.6C14.4 10.3 13.3 10 12 10s-2.4.3-3.4.9c-.9.6-1.6 1.5-1.6 2.6 0 1.1.7 2 1.6 2.6 1 .6 2.1.9 3.4.9Z" />
    <path d="M12 10V7" />
    <path d="M9 4.5 12 7l3-2.5" />
  </svg>
);

const TasksIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="5" width="6" height="6" rx="1" />
    <path d="m3 17 2 2 4-4" />
    <path d="M13 6h8" />
    <path d="M13 12h8" />
    <path d="M13 18h8" />
  </svg>
);

const FilterIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

// Business/Idea data structure
const businessIdeasData = {
  'Company A': {
    type: 'business',
    name: 'Company A',
    description: 'E-commerce platform focused on sustainable products',
    industry: 'Retail',
    stage: 'Growth',
    color: 'bg-red-500'
  },
  'Company B': {
    type: 'business',
    name: 'Company B',
    description: 'SaaS solution for project management',
    industry: 'Technology',
    stage: 'Mature',
    color: 'bg-green-500'
  },
  'Idea X': {
    type: 'idea',
    name: 'Idea X',
    description: 'AI-powered personal fitness coach mobile app',
    category: 'Health & Fitness',
    stage: 'Concept',
    color: 'bg-yellow-500'
  },
  'Idea Y': {
    type: 'idea',
    name: 'Idea Y',
    description: 'Blockchain-based digital identity verification',
    category: 'Security',
    stage: 'Development',
    color: 'bg-purple-500'
  }
};

// Utility function to get a color for a company/idea
const getColorForAssignedTo = (assignedTo) => {
  return businessIdeasData[assignedTo]?.color || 'bg-gray-500';
};

// Mock data for the dashboard with 'assignedTo', 'startDate', 'durationInDays', 'amount', and 'assignedUser' fields
const initialTasks = [
  {
    id: 1,
    title: "Website Redesign",
    status: "To Do",
    dueDate: "2025-08-15",
    reminder: "2025-08-14",
    assignedTo: "Company A",
    assignedUser: "Jane Smith",
    subtasks: [
      { id: 101, title: "Create wireframes", completed: false, startDate: "2025-08-01", durationInDays: 5, amount: 200, assignedUser: "Jane Smith" },
      { id: 102, title: "Design mockups", completed: false, startDate: "2025-08-06", durationInDays: 7, amount: 350, assignedUser: "John Doe" },
    ]
  },
  {
    id: 2,
    title: "Implement User Authentication",
    status: "In Progress",
    dueDate: "2025-08-20",
    reminder: "2025-08-19",
    assignedTo: "Idea Y",
    assignedUser: "Jane Smith",
    subtasks: [
      { id: 201, title: "Set up backend API", completed: true, startDate: "2025-08-10", durationInDays: 3, amount: 500, assignedUser: "John Doe" },
      { id: 202, title: "Develop frontend forms", completed: false, startDate: "2025-08-13", durationInDays: 4, amount: 450, assignedUser: "Jane Smith" },
      { id: 203, title: "Integrate with database", completed: false, startDate: "2025-08-17", durationInDays: 3, amount: 600, assignedUser: "John Doe" },
    ]
  },
  {
    id: 3,
    title: "Bug Fixing & Testing",
    status: "Done",
    dueDate: "2025-08-10",
    assignedTo: "Company B",
    assignedUser: "John Doe",
    subtasks: [
      { id: 301, title: "Fix login bug", completed: true, startDate: "2025-08-08", durationInDays: 1, amount: 150, assignedUser: "Jane Smith" },
      { id: 302, title: "Run end-to-end tests", completed: true, startDate: "2025-08-09", durationInDays: 1, amount: 100, assignedUser: "John Doe" },
    ]
  },
  {
    id: 4,
    title: "Prepare Marketing Campaign",
    status: "To Do",
    dueDate: "2025-08-25",
    reminder: "2025-08-24",
    assignedTo: "Company A",
    assignedUser: "Jane Smith",
    subtasks: [
      { id: 401, title: "Draft social media posts", completed: false, startDate: "2025-08-20", durationInDays: 2, amount: 200, assignedUser: "Jane Smith" },
      { id: 402, title: "Schedule email blast", completed: false, startDate: "2025-08-22", durationInDays: 3, amount: 300, assignedUser: "John Doe" },
    ]
  },
  {
    id: 5,
    title: "Database Migration",
    status: "In Progress",
    dueDate: "2025-08-30",
    reminder: "2025-08-28",
    assignedTo: "Idea X",
    assignedUser: "John Doe",
    subtasks: [
      { id: 501, title: "Back up current data", completed: true, startDate: "2025-08-25", durationInDays: 2, amount: 400, assignedUser: "John Doe" },
      { id: 502, title: "Migrate to new server", completed: false, startDate: "2025-08-27", durationInDays: 3, amount: 700, assignedUser: "Jane Smith" },
    ]
  },
];

const mockUsers = ['John Doe', 'Jane Smith', 'Peter Jones'];

// Business/Idea Card Component
const BusinessIdeaCard = ({ businessIdea, tasks, onViewTasks }) => {
  const assignedTasks = tasks.filter(task => task.assignedTo === businessIdea.name);
  const totalAmount = assignedTasks.reduce((sum, task) => 
    sum + task.subtasks.reduce((taskSum, subtask) => taskSum + subtask.amount, 0), 0
  );
  
  const statusCounts = {
    'To Do': assignedTasks.filter(t => t.status === 'To Do').length,
    'In Progress': assignedTasks.filter(t => t.status === 'In Progress').length,
    'Done': assignedTasks.filter(t => t.status === 'Done').length
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {businessIdea.type === 'business' ? 
            <BusinessIcon className="text-blue-400" /> : 
            <IdeaIcon className="text-yellow-400" />
          }
          <div>
            <h3 className="text-xl font-bold text-white">{businessIdea.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full text-white ${businessIdea.color}`}>
              {businessIdea.type === 'business' ? businessIdea.industry : businessIdea.category}
            </span>
          </div>
        </div>
        <span className="text-sm px-3 py-1 rounded-full bg-gray-700 text-gray-300">
          {businessIdea.stage}
        </span>
      </div>
      
      <p className="text-gray-300 text-sm mb-4">{businessIdea.description}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-900 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-400">${totalAmount}</div>
          <div className="text-xs text-gray-400">Total Value</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-400">{assignedTasks.length}</div>
          <div className="text-xs text-gray-400">Tasks</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-xs mb-4">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          <span className="text-gray-400">To Do: {statusCounts['To Do']}</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-400">In Progress: {statusCounts['In Progress']}</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-gray-400">Done: {statusCounts['Done']}</span>
        </div>
      </div>
      
      <button
        onClick={() => onViewTasks(businessIdea.name)}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        <TasksIcon />
        <span>View Tasks</span>
      </button>
    </div>
  );
};

// Business/Ideas Overview Component
const BusinessIdeasOverview = ({ tasks, onViewTasks }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Business & Ideas Overview</h2>
        <p className="text-gray-400">Manage tasks across your businesses and ideas</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.values(businessIdeasData).map(businessIdea => (
          <BusinessIdeaCard
            key={businessIdea.name}
            businessIdea={businessIdea}
            tasks={tasks}
            onViewTasks={onViewTasks}
          />
        ))}
      </div>
    </div>
  );
};

// Component to display a timeline for subtasks
const SubtaskTimeline = ({ subtasks }) => {
  if (!subtasks || subtasks.length === 0) {
    return <p className="text-sm text-gray-500 italic">No subtasks defined.</p>;
  }

  const sortedSubtasks = [...subtasks].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const today = new Date();

  return (
    <div className="relative mt-4 pt-4">
      <div className="absolute left-0 top-0 h-full w-1 bg-gray-600 ml-2"></div>
      <div className="ml-8 space-y-4">
        {sortedSubtasks.map((subtask) => {
          const startDate = new Date(subtask.startDate);
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + subtask.durationInDays);
          const isOverdue = !subtask.completed && today > endDate;

          return (
            <div key={subtask.id} className="relative flex items-start">
              <div className={`absolute -left-9 top-1/2 -mt-2 w-4 h-4 rounded-full border-2 border-gray-800 z-10 ${isOverdue ? 'bg-red-500' : subtask.completed ? 'bg-green-500' : 'bg-blue-500'}`}></div>
              <div className="bg-gray-900 rounded-lg p-3 shadow-lg w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-100">{subtask.title}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{subtask.assignedUser}</span>
                    <span className="text-sm text-gray-400">${subtask.amount}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {subtask.startDate} ({subtask.durationInDays} days)
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Reusable Task Card component for Kanban and Timeline views
const TaskCard = ({ task, expanded, onToggleSubtasks, onEdit }) => {
  const totalAmount = task.subtasks.reduce((sum, subtask) => sum + subtask.amount, 0);

  return (
    <div className="bg-gray-900 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-100">{task.title}</h3>
        <div className="flex items-center space-x-2">
          <button onClick={() => onEdit(task)} className="text-gray-400 hover:text-blue-500 transition-colors">
            <EditIcon />
          </button>
          <span className={`text-sm px-2 py-1 rounded-full text-white ${getColorForAssignedTo(task.assignedTo)}`}>
            {task.assignedTo}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 mb-4">
        <div className="text-lg font-bold text-green-400">${totalAmount}</div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">{task.assignedUser}</span>
          {task.reminder && (
            <BellIcon className="text-blue-400" title={`Reminder: ${task.reminder}`} />
          )}
          <span className="text-sm text-gray-400 flex items-center">
            <ClockIcon className="mr-1" />
            {task.dueDate}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 cursor-pointer text-sm text-gray-400 hover:text-gray-200"
           onClick={() => onToggleSubtasks(task.id)}>
        <div className="flex items-center space-x-1">
          {expanded ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
          <span>Subtasks ({task.subtasks.length})</span>
        </div>
      </div>
      {expanded && (
        <SubtaskTimeline subtasks={task.subtasks} />
      )}
    </div>
  );
};

const KanbanBoard = ({ tasks, onEdit, filteredAssignedTo = null }) => {
  const [expandedTasks, setExpandedTasks] = useState({});
  const toggleSubtasks = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const statuses = ["To Do", "In Progress", "Done"];
  const filteredTasks = filteredAssignedTo 
    ? tasks.filter(task => task.assignedTo === filteredAssignedTo)
    : tasks;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {statuses.map(status => (
        <div key={status} className="flex flex-col bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">{status}</h2>
            <span className="bg-gray-700 text-gray-300 rounded-full px-3 py-1 text-sm font-medium">{filteredTasks.filter(t => t.status === status).length}</span>
          </div>
          <div className="space-y-4">
            {filteredTasks.filter(t => t.status === status).map(task => (
              <TaskCard
                key={task.id}
                task={task}
                expanded={expandedTasks[task.id]}
                onToggleSubtasks={toggleSubtasks}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const TimelineView = ({ tasks, onEdit, filteredAssignedTo = null }) => {
  const [expandedTasks, setExpandedTasks] = useState({});
  const toggleSubtasks = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };
  
  const filteredTasks = filteredAssignedTo 
    ? tasks.filter(task => task.assignedTo === filteredAssignedTo)
    : tasks;
  
  // Sort tasks by due date
  const sortedTasks = [...filteredTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="p-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Timeline View</h2>
        <div className="space-y-6">
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              expanded={expandedTasks[task.id]}
              onToggleSubtasks={toggleSubtasks}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CalendarView = ({ tasks, filteredAssignedTo = null }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const filteredTasks = filteredAssignedTo 
    ? tasks.filter(task => task.assignedTo === filteredAssignedTo)
    : tasks;

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday...
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const numDays = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const daysArray = Array.from({ length: numDays }, (_, i) => i + 1);
  const blankDays = Array.from({ length: firstDay }, (_, i) => i);

  const getTasksForDay = (day) => {
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month + 1).padStart(2, '0');
    const dateString = `${year}-${formattedMonth}-${formattedDay}`;
    return filteredTasks.filter(task => task.dueDate === dateString);
  };

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="p-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <button onClick={goToPrevMonth} className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
            <ChevronRightIcon className="transform rotate-180" />
          </button>
          <h2 className="text-2xl font-bold text-white">{monthName} {year}</h2>
          <button onClick={goToNextMonth} className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
            <ChevronRightIcon />
          </button>
        </div>
        <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-400">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-2">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-white">
          {blankDays.map((_, i) => (
            <div key={`blank-${i}`} className="p-4 border border-gray-700 rounded-lg"></div>
          ))}
          {daysArray.map(day => (
            <div key={day} className="p-2 border border-gray-700 rounded-lg h-32 flex flex-col items-center">
              <span className="font-semibold text-lg">{day}</span>
              <div className="mt-2 space-y-1 overflow-y-auto w-full">
                {getTasksForDay(day).map(task => (
                  <div key={task.id} className={`text-xs px-2 py-1 rounded-md text-white truncate ${getColorForAssignedTo(task.assignedTo)}`}>
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TaskFormModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const isEditing = !!initialData;
  const [title, setTitle] = useState(initialData?.title || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [status, setStatus] = useState(initialData?.status || 'To Do');
  const [assignedTo, setAssignedTo] = useState(initialData?.assignedTo || 'Company A');
  const [assignedUser, setAssignedUser] = useState(initialData?.assignedUser || mockUsers[0]);
  const [reminder, setReminder] = useState(initialData?.reminder || '');
  const [subtasks, setSubtasks] = useState(initialData?.subtasks || [{ id: 1, title: '', completed: false, startDate: '', durationInDays: 1, amount: 0, assignedUser: mockUsers[0] }]);

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { id: Math.random(), title: '', completed: false, startDate: '', durationInDays: 1, amount: 0, assignedUser: mockUsers[0] }]);
  };

  const handleSubtaskChange = (index, key, value) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index][key] = value;
    setSubtasks(newSubtasks);
  };

  const handleRemoveSubtask = (index) => {
    const newSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(newSubtasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      console.error('Task title and due date are required!');
      return;
    }
    const taskData = {
      id: isEditing ? initialData.id : Math.random(),
      title,
      dueDate,
      status,
      assignedTo,
      assignedUser,
      reminder: reminder || undefined,
      subtasks: subtasks.filter(st => st.title.trim() !== ''),
    };
    onSave(taskData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-100">
            <PlusIcon className="transform rotate-45" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Assigned To</label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(businessIdeasData).map(key => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Assigned User</label>
            <select
              value={assignedUser}
              onChange={(e) => setAssignedUser(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {mockUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Reminder Date (Optional)</label>
            <input
              type="date"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">Subtasks</label>
            <div className="space-y-2">
              {subtasks.map((subtask, index) => (
                <div key={subtask.id} className="flex flex-col space-y-2 border border-gray-700 p-2 rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={subtask.title}
                      onChange={(e) => handleSubtaskChange(index, 'title', e.target.value)}
                      className="w-full p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Subtask ${index + 1}`}
                    />
                    {subtasks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSubtask(index)}
                        className="ml-2 text-red-400 hover:text-red-600"
                      >
                        <PlusIcon className="transform rotate-45 w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <select
                      value={subtask.assignedUser}
                      onChange={(e) => handleSubtaskChange(index, 'assignedUser', e.target.value)}
                      className="w-1/4 p-2 rounded-md bg-gray-900 text-white border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {mockUsers.map(user => (
                        <option key={user} value={user}>{user}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={subtask.startDate}
                      onChange={(e) => handleSubtaskChange(index, 'startDate', e.target.value)}
                      className="w-1/4 p-2 rounded-md bg-gray-900 text-white border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Start Date"
                    />
                    <input
                      type="number"
                      value={subtask.durationInDays}
                      onChange={(e) => handleSubtaskChange(index, 'durationInDays', parseInt(e.target.value, 10) || 1)}
                      className="w-1/4 p-2 rounded-md bg-gray-900 text-white border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Duration (days)"
                      min="1"
                    />
                    <input
                      type="number"
                      value={subtask.amount}
                      onChange={(e) => handleSubtaskChange(index, 'amount', parseFloat(e.target.value) || 0)}
                      className="w-1/4 p-2 rounded-md bg-gray-900 text-white border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Amount"
                      min="0"
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddSubtask}
              className="mt-2 text-blue-400 flex items-center hover:text-blue-200 text-sm font-medium"
            >
              <PlusIcon className="mr-1" />
              Add Subtask
            </button>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-full font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState("overview");
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filteredAssignedTo, setFilteredAssignedTo] = useState(null);

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks(tasks.map(task => (task.id === taskData.id ? taskData : task)));
    } else {
      setTasks([...tasks, taskData]);
    }
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleViewTasks = (assignedTo) => {
    setFilteredAssignedTo(assignedTo);
    setView("kanban");
  };

  const handleBackToOverview = () => {
    setFilteredAssignedTo(null);
    setView("overview");
  };

  const clearFilter = () => {
    setFilteredAssignedTo(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100">
      <div className="flex items-center justify-between p-4 bg-gray-800 shadow-md">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold flex items-center">
            <DashboardIcon className="mr-2 text-blue-500" />
            Task Dashboard
          </h1>
          {filteredAssignedTo && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBackToOverview}
                className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                <ArrowLeftIcon />
              </button>
              <span className={`text-sm px-3 py-1 rounded-full text-white ${getColorForAssignedTo(filteredAssignedTo)}`}>
                {filteredAssignedTo}
              </span>
              <button
                onClick={clearFilter}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FilterIcon />
              </button>
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-full font-medium bg-blue-600 text-white flex items-center hover:bg-blue-500 transition-colors"
          >
            <PlusIcon className="mr-2" />
            Add Task
          </button>
          <button
            onClick={() => setView("overview")}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              view === "overview" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setView("kanban")}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              view === "kanban" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Kanban
          </button>
          <button
            onClick={() => setView("timeline")}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              view === "timeline" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              view === "calendar" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Calendar
          </button>
        </div>
      </div>
      <main>
        {view === "overview" && <BusinessIdeasOverview tasks={tasks} onViewTasks={handleViewTasks} />}
        {view === "kanban" && <KanbanBoard tasks={tasks} onEdit={handleOpenEditModal} filteredAssignedTo={filteredAssignedTo} />}
        {view === "timeline" && <TimelineView tasks={tasks} onEdit={handleOpenEditModal} filteredAssignedTo={filteredAssignedTo} />}
        {view === "calendar" && <CalendarView tasks={tasks} filteredAssignedTo={filteredAssignedTo} />}
      </main>
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        initialData={editingTask}
      />
    </div>
  );
};

export default App;