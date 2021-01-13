import { Injectable } from '@angular/core';
import { IUserData, IUserDataSelectionDto } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  sharedUserSelectionModel = 'shared_user_selection';
  userData = 'active_user_data';
  currentScreen = 'current_screen';
  tokenKey = 'token_key';
  path = 'nav_path';
  authCode = 'auth_code';


  constructor() { }

  
  public getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public getUserFromLocalStorage(): any {
    return this.getItem(this.userData);
  }

  public storeUserDataOnLocalStorage(userData: IUserData): any {
    return this.setItem(this.userData, userData);
  }

  public getUserSelectionFromLocalStorage(): any {
    return this.getItem(this.sharedUserSelectionModel);
  }

  public storeUserSelectionOnLocalStorage(userDataSelection: IUserDataSelectionDto): any {
    return this.setItem(this.sharedUserSelectionModel, userDataSelection);
  }

}
