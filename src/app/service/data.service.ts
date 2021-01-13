import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { IUserData, IUserDataSelectionDto, IWorkCenter, TaxProProfileServiceInput } from '../model/model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  authCode = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MDQwMDIzIiwiYXVkIjoiQXBpZ2VlQXVkaWVuY2UiLCJpc3MiOiJBcGlnZWUiLCJleHAiOjE2MTA0OTU2NjgsImlhdCI6MTYxMDQ4MTI2OCwianRpIjoiY2U5MjNkNjAtMTljNS00ZDdjLTkzZjItMzU0OGEzMGYwY2M5IiwiYXV0aF9jb2RlIjoiSnNLaFdHUjMifQ.TdiPDNBigxtmQgPcCJDUzR4skhWWcnwl2Q3dHovLFihEIeNZI6nsoC2Bj6_rDt-voLOr0uMmpvXcQHsVQ3CJrQ';
  constructor(private ionichttp: HTTP) { 
    this.API_BASE_URL = 'https://fspmiddleflow-api-z1.hrb-ase-qa.net';

  }

  isNative : boolean = true;
  taxProImage = new BehaviorSubject<any>(null);
  getTaxProImage = this.taxProImage.asObservable();
  private API_BASE_URL = '';
  private userDataUrl = '/UserData/';
  private userSelectionUrl = '/UserSelectionData/';

  private generateFormsUrl = '/forms/generate/';
  private taxProUrl = '/TaxPro/photourl';
  private workCenterURL = '/WorkCenter/clientdata/task/';
  private authCodeURL = '/Test/';
  private messageUrl = '/Message/';


  public setTaxProImageURL(image){
    this.taxProImage.next(image);
  }

  private getIonicHeaders(){
    const ionicHeader = {
      Authorization: 'Bearer ' + (this.authCode || '')
    }
    return ionicHeader;
  }

  getWorkCenterData(): Observable<any> {
    debugger;
    var url = 'https://fspmiddleflow-api-z1.hrb-ase-qa.net/api/WorkCenter/clientdata/task/50';//this.API_BASE_URL + this.workCenterURL + id;

    return this.callNative(url, 'GET', {} ,this.getIonicHeaders())
    //return throwError(new Error('error2'));
    //return Observable.throw(new Error('dfdfdf'));
    // throw new HttpErrorResponse({
    //   error: 'your error',
    //   status: 500,
    //   statusText: 'Warning',
    //   url: "test"
    // });   
  }

  callNative(url, method, params, headers?): Observable<any> {
    //this.ionichttp.setCookie(url, localStorage.getItem('Cookie'));
    //tslint:disable-next-line: deprecation
    return Observable.create((ob) => {
      switch (method) {
        case 'GET':
          console.log(" about to hit http get");
          this.ionichttp
            .get(url, params, headers)
            .then(this.successCallback(ob))
            .catch(this.errorCallback(ob));
            //.catch(this.handleError(ob));
          break;
        case 'POST':
          this.ionichttp.setDataSerializer('json');
          this.ionichttp
            .post(url, params, headers)
            .then(this.successCallback(ob))
            .catch(this.errorCallback(ob));
          break;
        case 'PUT':
          this.ionichttp.setDataSerializer('json');
          this.ionichttp
            .put(url, params, headers)
            .then(this.successCallback(ob))
            .catch(this.errorCallback(ob));
          break;
        case 'DELETE':
          this.ionichttp
            .delete(url, params, headers)
            .then(this.successCallback(ob))
            .catch(this.errorCallback(ob));
          break;
          case 'VIEWFILE':
          this.ionichttp.sendRequest(url, { method: 'get', headers: headers, responseType: 'arraybuffer' })
            .then(this.successCallback(ob))
            .catch(this.errorCallback(ob));
          break;
        case 'DOWNLOADFILE':
          this.ionichttp.sendRequest(url, { method: 'download', responseType: 'arraybuffer' })
            .then(this.successCallback(ob))
            .catch(this.errorCallback(ob));
          break;
        case 'UPLOAD':
          this.ionichttp.sendRequest(url, {
            method: 'post', headers: headers, responseType: 'json', data: params, serializer: 'multipart',
          }).then(this.successCallback(ob))
            .catch(this.errorCallback(ob));
          break;
      }
    });
  }
  successCallback(ob) {
    return (response: any) => {
      console.log('successCallback ntive call ', JSON.stringify(response));
      if (response != null && response.data != null && response.data !== '') {
        try {
          ob.next(JSON.parse(response.data));
        } catch (exception) {
          ob.next(response.data);
        }
      } else if (
        response != null &&
        response.status != null &&
        (response.status === 202 || response.status === 200)
      ) {
        ob.next('Success');
      } else {
        ob.next(null);
      }
      //alert('success ' + JSON.stringify(response));
      ob.next(new HttpResponse({ body: JSON.parse(response.data) }));
      ob.complete();
    };
  }

  errorCallback(ob) {
    return (response: any) => {
      console.error('errorCallback native call ', JSON.stringify(response));
      ob.next(response);
      //alert('error ' + JSON.stringify(response));
      
      //ob.next(new HttpErrorResponse({ error:response.error}));
      ob.next(response.error = "Error Test");
      console.log(' logged from errorcallback ' +  response.error);
      //ob.throw (new Error("wewee"));
      //throwError(new Error('oops!'))
      ob.complete();
      
    };
  }

  handleError(ob){
    //return ob.throw('Some error information');
    return throwError(new Error('error2'));
  }

  getUserData(): Observable<IUserData> {
    var url = this.API_BASE_URL + this.userDataUrl;
    console.log('request url for getUserData ' + url);
    console.log('this.isNative value before getUserData ' + this.isNative);

    return this.callNative(url, 'GET', {}, this.getIonicHeaders())
  }

  public saveUserData(userData: IUserData): Observable<any> {
    //this.getEnviornment();
    const url = this.API_BASE_URL + this.userDataUrl;
    return this.callNative(url, 'POST', userData, this.getIonicHeaders())
  }

  getUserSelection(): Observable<IUserDataSelectionDto> {
    const url = this.API_BASE_URL + this.userSelectionUrl;
    return this.callNative(url, 'GET', {},this.getIonicHeaders())
  }

  public saveUserSelection(userSelection: IUserDataSelectionDto): Observable<any> {
    //this.getEnviornment();
    const url = this.API_BASE_URL + this.userSelectionUrl;
      return this.callNative(url, 'POST', userSelection, this.getIonicHeaders())
  }

  
  getTaxProUrl(taxProProfileServiceInput: TaxProProfileServiceInput): Observable<any> {
    // const url = this.API_BASE_URL + this.taxProUrl;
    //   return this.isNative
    //   ? this.callNative(url, 'POST', taxProProfileServiceInput, { responseType: 'blob' as 'json' })
    //   : this.http.post<any>(url, taxProProfileServiceInput, { responseType: 'blob' as 'json' });

    const url = this.API_BASE_URL + this.taxProUrl;
      return this.callNative(url, 'POST', taxProProfileServiceInput, { Authorization: 'Bearer ' + (this.authCode || ''),responseType: 'blob' as 'json' })
  }
}
