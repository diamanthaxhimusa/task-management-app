export default {
  login: '/login',
  register: '/register',
  tasks: '/tasks',
  lists: '/lists',
  editUser: '/users',
  me: '/users/me',
  completeTask: (taskId: string) => `/tasks/${taskId}/set-complete`,
  singleTask: (taskId: string) => `/tasks/${taskId}`,
  singleList: (listId: string) => `/tasks/${listId}`
};
