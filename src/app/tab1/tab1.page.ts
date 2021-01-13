import { Component } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private dataService: DataService) {
    //this.callWorkCenter();
    this.callWrokCenterTest();
  }

  callWorkCenter(){
    this.dataService.getWorkCenterData()
    .subscribe(
      (response) => {
          console.log(" yeeee got the value " + JSON.stringify(response));
          alert('success = ' + JSON.stringify(response));
          alert('ssoId '+ response?.taxProSsoId)//"PDORNAN";//)
      },
      (error) => {
        console.log(" Oh o got error " + JSON.stringify(error));
        alert('error ' + JSON.stringify(error));
      }
      )}

      callWrokCenterTest(){
      this.dataService.getWorkCenterData().subscribe(res => {
        if (res && !res.error) {
          console.log(' i am called from success response of callWrokCenterTest. taxProSSO id is= ' + res.taxProSsoId);
        }
        else{
          console.log(' i am called fromsucess block to catch error response of callWrokCenterTest. status id is= ' + JSON.stringify(res));  
        }
      },
      error => {
        console.log(' i am called from error response of callWrokCenterTest. status id is= ' + JSON.stringify(error));
      });
    }






}
