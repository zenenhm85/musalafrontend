import { Component, OnInit } from '@angular/core';

import { AccountSettingService } from '../../services/account-setting.service'

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [
  ]
})
export class AccountSettingComponent implements OnInit {

  constructor(private settingService: AccountSettingService) { }
 

  ngOnInit(): void {
      this.checkCurrentTheme();
  }
  changeTheme(theme:string){        
   this.settingService.changeTheme(theme);
  }
  checkCurrentTheme(){
    this.settingService.checkCurrentTheme();   
  }

}
