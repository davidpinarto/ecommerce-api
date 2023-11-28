const UsersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server, { container }) => {
    const usersHandler = new UsersHandler(container);
    server.route(routes(usersHandler));
  },
};
