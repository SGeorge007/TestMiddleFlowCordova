import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './service/data.service';
import { LocalStorageService } from './service/local-storage.service';
import { TaxProProfileServiceInput } from './model/model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    private localStorage : LocalStorageService
  ) {
    this.initializeApp();
    // setTimeout(() => {
    //   this.getWorkCenterData();  
    // }, 2000);
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  
  getWorkCenterData(): void {
    console.log(" I am called inside app.component:  getWorkCenterData ");
    
    this.dataService.getWorkCenterData().subscribe(
      (response) => {
        console.log(" got success call from tgetWorkCenterData:   " + JSON.stringify(response));
        this.getUserData();
        //this.router.initialNavigation();
        this.localStorage.setItem("isAuthCodeValid",true);
        const ssoId = response?.taxProSsoId;//"PDORNAN";//
        this.getTaxProImage(ssoId);
        this.localStorage.setItem('WorkCenter', response);
      },
      (error) => { 
        console.log(" got error from tgetWorkCenterData:   " + JSON.stringify(error));
        console.log(" Initial call to work center FAILED  with error code " + error.status);

        console.log("error.status for work center "+ error.status);
        if(error.status == 401){
          //this.router.initialNavigation();
          this.localStorage.setItem("isAuthCodeValid",false);
        }
        this.localStorage.setItem("isAuthCodeValid",true);
        console.log(error);

        //TODO: Uncomment this after QA test. User should not be allowed to enter app if taskId is null
        //this.router.navigate(['/gua-error']);
        this.getUserData();
      }
    );
  }

  getTaxProImage(ssoId : string) {
    console.log(" I am called inside app.component:  getTaxProImage ");
    const taxProInput = new TaxProProfileServiceInput();
    taxProInput.sso_id = ssoId;//'PDORNAN'
    taxProInput.search_mode = 'BYPSID';

    this.dataService.getTaxProUrl(taxProInput).subscribe(
      (response) => {
        console.log(' getTaxProImage success= ' + JSON.stringify(response));
        //this.localStorage.setItem('taxProImage', response.fileName);
        this.createImageFromBlob(response);
        //this.router.navigate(['/offer-onboarding']);
      },
      (error) => {   
        console.log(' getTaxProImage ' + error);
        //this.router.navigate(['/offer-onboarding']); 
      }
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load",
      () => {
          var temp = reader.result;
          this.dataService.setTaxProImageURL(reader.result);
      },
      false);

    if (image) {
      if (image.type !== "application/pdf")
        reader.readAsDataURL(image);
    }
  }

    getUserData(): void {
      console.log(" I am called inside app.component:  getUserData ");
    this.dataService.getUserData().subscribe(
      (response) => {
        this.localStorage.storeUserDataOnLocalStorage(response);
        //this.monitoringService.setUserId(response.id);
        console.log(" QATEST-GETUSERDATA " + response);

        this.getUserSelectionData(response.lastPage);
      },
      (err) => {
        //User can never be null. If user doesn't exist show error screen.
        //this.monitoringService.logException(err);
        console.log('Eror received from user response ' + JSON.stringify(err));
      },
    );
  }

  getUserSelectionData(lastPage: string): void {
    console.log(" I am called inside app.component:  getUserSelectionData ");
    this.dataService.getUserSelection().subscribe(
      (response) => {
        console.log("----GetUser Selection = " + JSON.stringify(response));
        this.localStorage.storeUserSelectionOnLocalStorage(response);
        if(lastPage){
          //this.router.navigate(['/' + lastPage]);
          console.log(' lastPage ' + lastPage);
        }
      },
      (err) => {
        //this.logger.logException(err);
        console.log(err);
      },
    );
  }



}
