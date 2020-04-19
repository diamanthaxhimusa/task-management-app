export default {
  login: '/login',
  register: '/register',
  tasks: '/tasks',
  editUser: '/users',
  me: '/users/me',
  completeTask: (taskId: string) => `/tasks/${taskId}/set-complete`,
  deleteTask: (taskId: string) => `/tasks/${taskId}`
};
