import bcryptjs from 'bcrypt';

const users = [
  {
    username: 'Admin',
    email: 'admin@example.com',
    password: bcryptjs.hashSync('123456', 10),
  },
];

export default users;
