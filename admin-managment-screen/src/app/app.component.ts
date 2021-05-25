import { Component } from '@angular/core';
import { AddGroupComponent } from './add-group/add-group.component';
import {SharedDataService} from '../app/shared-data.service'
import { Subject } from 'rxjs';
import {GroupServiceService} from '../app/RoleGroupService/group-service.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Admin Managment Screen';
  pageMng:boolean = false;

  constructor(){
  }


}
