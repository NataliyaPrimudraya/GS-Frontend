export interface User {
  id: number,
  login: string,
  password: string,
  name: string,
  age: number,
  birthdate: Date,
  salary: number,
  roles: string[],
}
