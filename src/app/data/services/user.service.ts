import {Injectable} from '@angular/core';
import {User} from '../interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseApiUrl: string = "http://localhost:8080/webdispatch/api/users";

  constructor(private http: HttpClient) {
  }

  async getUserById(id: number) {
    return await firstValueFrom(this.http.get<User>(`${this.baseApiUrl}/${id}`));
  }

  async getAllUsers() {
    return await lastValueFrom(this.http.get<User[]>(this.baseApiUrl))
  }

  async addUser(user: User) {
    await firstValueFrom(this.http.post(this.baseApiUrl, user))
  }

  async updateUser(user: User) {
    await firstValueFrom(this.http.put(this.baseApiUrl, user))
  }

  async deleteUser(id: number) {
    await firstValueFrom(this.http.delete(`${this.baseApiUrl}/${id}`))
  }

}
