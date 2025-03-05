import {Injectable} from '@angular/core';
import {User} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [
    {
      id: 1,
      name: 'John',
      login: 'root',
      password: 'root',
      age: 22,
      birthdate: new Date('1970-01-01'),
      salary: 2000,
      roles: ['ADMIN'],
    },
    {
      id: 2,
      name: 'Mary',
      login: 'login',
      password: 'password',
      age: 22,
      birthdate: new Date('1970-01-02'),
      salary: 2000,
      roles: ['USER', 'MANAGER'],
    }
  ]

  idCount = 2;

  getUserById(id: number): User | null {
    let user = this.users.find((user) => user.id == id);
    return user ? user : null;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUserByLoginAndPassword(login: string, password: string): User | null {
    let user = this.users.find((user) => user.login == login && user.password == password);
    return user ? user : null;
  }

  addUser(user: User): void {
    this.idCount++;
    user.id = this.idCount;
    this.users.push(user);
  }

  updateUser(user: User): void {
    const index = this.users.findIndex(u => u.id == user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  deleteUser(id: number): void {
    const index = this.users.findIndex(u => u.id == id);
    this.users.splice(index, 1);
  }

}
