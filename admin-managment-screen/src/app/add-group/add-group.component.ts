import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoleTabItem } from '../role-tab/role-tab-datasource';
import {GroupServiceService} from '../RoleGroupService/group-service.service'
import {MatSnackBar} from '@angular/material/snack-bar'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { concatMap, startWith } from 'rxjs/operators';
import {SharedDataService} from '../shared-data.service'


@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

 
  item:RoleTabItem 
  show:boolean=false;
  cashier:RoleTabItem;


  constructor(private grpService:GroupServiceService, 
              public sharedData:SharedDataService,
              public snack:MatSnackBar,
              public dialogRef: MatDialogRef<AddGroupComponent>,
              //@Inject(MAT_DIALOG_DATA) public data: DialogData
              ) { } 

  ngOnInit(): void {}

  showSnackBar(content:string){
    this.snack.open(content)._dismissAfter(2000);
  }

  closeDialogFromFather(){ 
   
    this.dialogRef.close();
  } //get a reference to dialog obj to close the dialog after save has been clicked

  onSave(i_grpName:string,i_grpDesc:string):void{
    
    this.cashier = new RoleTabItem();
    if(i_grpName!=''){
      this.show=true;
      this.cashier.m_GRP_Name=i_grpName;
      this.cashier.m_Description=i_grpDesc;
      this.cashier.m_GRP_id=0;
      this.grpService.addRoleGroup(this.cashier).subscribe((returnedIdentity:number) => {
        console.log(returnedIdentity);
        this.cashier.m_GRP_id=returnedIdentity;
        this.sharedData.changeMessage(this.cashier); 
        this.grpService.refreshNeeded$.next();
      });
    this.showSnackBar("Saved Successfully")
    this.closeDialogFromFather();
  }
    else{
      this.showSnackBar("must enter - Group Name")
    }
  }

}
