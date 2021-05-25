import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {GroupServiceService} from 'src/app/RoleGroupService/group-service.service'
import {SharedDataService} from '../shared-data.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-remove-group',
  templateUrl: './remove-group.component.html',
  styleUrls: ['./remove-group.component.css']
})
export class RemoveGroupComponent implements OnInit {


  constructor(private grp_service:GroupServiceService,
              private sharedService:SharedDataService,
              public snack:MatSnackBar,
              public dialogRef: MatDialogRef<RemoveGroupComponent>) { }

  selectedMessage:any;
  ngOnInit(): void {
    this.sharedService.currentMessage.subscribe(message => 
      (this.selectedMessage = message));
  }
  
  showSnackBar(content:string){
    this.snack.open(content)._dismissAfter(3000);
    
  }

  closeDialogFromFather(){ 
   
    this.dialogRef.close();
    
  } 

  removeGroup(){

    if(this.selectedMessage.m_GRP_id !=undefined){
      console.log(this.selectedMessage.m_GRP_id)
      this.grp_service.deleteGroup(this.selectedMessage.m_GRP_id).subscribe((res) => {
        console.log(this.selectedMessage.m_GRP_id + 'deleted');
        this.sharedService.changeMessage('remove'); //to remove manualy from table
        this.grp_service.refreshNeeded$.next();
      });
      this.showSnackBar('Group removed successfully');
    }
    else{
      this.showSnackBar('nothing happened, must choose a group to delete');
    }
    this.closeDialogFromFather();
  }

}
