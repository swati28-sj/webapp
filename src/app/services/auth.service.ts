import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  http = inject(HttpClient);
  
  register(name: string, email: string, password: string){
    return this.http.post(environment.apiUrl + "/auth/register", {
      name: name,
      email: email,
      password: password,
    });
  }

  login(email: string, password: string){
    return this.http.post(environment.apiUrl + "/auth/login", {
      email: email,
      password: password,
    });
  }
get isLoggedIn(){
  if (typeof localStorage !== 'undefined') {
  let token = localStorage.getItem("token");
    if(token){
      return true;
    }
  }
    return false;
}

get isAdmin(){
  if (typeof localStorage !== 'undefined') {
  let userData = localStorage.getItem("user");
    if(userData){
      return JSON.parse(userData).isAdmin;
    }
  }
    return false;
}

get userName() {
  if (typeof localStorage !== 'undefined') {
    let userData = localStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData).name;
    }
  }
  return null;
}


get userEmail(){
  if (typeof localStorage !== 'undefined') {
    let userData = localStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData).email;
    }
  }
  return null;
}

logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

}
