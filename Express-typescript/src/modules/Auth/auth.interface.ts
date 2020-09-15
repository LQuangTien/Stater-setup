interface Login {
  username: string;
  password: string;
}
interface Register {
  username: string;
  password: string;
  confirmPassword: string;
}
interface User {
  username: string;
  password: string;
}
export { Login, Register, User };
