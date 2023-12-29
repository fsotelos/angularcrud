import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/response'
import { User } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  getUsers() : Observable<Response<User>> {
    return this.http.get<Response<User>>('https://localhost:7218/GetUsers')
  }

  getUserById(idUser : number) : Observable<Response<User>> {
    return this.http.get<Response<User>>('https://localhost:7218/GetUserById?id=' + idUser)
  }

  addUser(user: User): Observable<Response<User>> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Response<User>>('https://localhost:7218/CreateUser', user, options);
  }

  editUser(user: User) : Observable<Response<User>> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.put<Response<User>>('https://localhost:7218/EditUser', user, options)
  }

  deleteUser(idUser: number) : Observable<Response<User>> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: idUser
      },
    };
    return this.http.delete<Response<User>>('https://localhost:7218/DeleteUser',  options)
  }
}
