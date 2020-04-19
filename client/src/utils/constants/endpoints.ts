export default {
  login: '/login',
  register: '/register',
  tasks: '/tasks',
  completeTask: (taskId: string) => `/tasks/${taskId}/set-complete`,
  deleteTask: (taskId: string) => `/tasks/${taskId}`
};
