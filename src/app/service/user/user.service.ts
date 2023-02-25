import {EventEmitter, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {User} from "../../model/User";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userChange = new EventEmitter<User>()

  constructor(private http: HttpClient) {
  }

  login(user?: User) {
    return this.http.post<User>(`${API_URL}/users/login`, user)
  }

  register(user?: User) {
    return this.http.post(`${API_URL}/users`, user);
  }


  updateUser(id: number|any ,user: User) {
    return this.http.put(`${API_URL}/users/${id}`, user);
  }

  getUser(id: number,): Observable<User> {
    return this.http.get<User>(`${API_URL}/users/${id}`)
  }

  findById(id: string | null): Observable<User> {
    return this.http.get<User>(`${API_URL}/users/${id}`)
  }

  getUsername() {
    return this.http.get<string[]>(`${API_URL}/users/usernames`)
  }

  updatePass(user?: User): Observable<User> {
    // @ts-ignore
    return this.http.put(`${API_URL}/users/changePass/`, user)
  }

  countByUser(id: string | any){
    return this.http.get<number[]>(`${API_URL}/users/countByUser/${id}`)
  }
}
