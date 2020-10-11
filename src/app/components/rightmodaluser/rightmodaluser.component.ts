import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';

import { UserCrudService } from '../../services/user-crud.service'
import {User} from '../../models/user.model'

@Component({
  selector: 'app-rightmodaluser',
  templateUrl: './rightmodaluser.component.html',
  styles: [
  ]
})
export class RightmodaluserComponent implements OnInit {

  @Input('idModal') idModal: string = '';
  @Input('user') user: User = new User(false,'','','','','','');


  constructor(private userCrudService: UserCrudService) { }

  ngOnInit(): void {
  }
  changeRole(user: User){
    this.userCrudService.updateRoleAndActive(user).subscribe(resp=>{
      Swal.fire('Success','Role changed successfully','success');
    });

  }
  changeActive(user:User){
    this.userCrudService.updateRoleAndActive(user).subscribe(resp=>{
      Swal.fire('Success','Successful operation','success');
    });    
  }

}
