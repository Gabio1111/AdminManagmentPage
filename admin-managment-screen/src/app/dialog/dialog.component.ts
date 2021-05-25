import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AddGroupComponent } from '../add-group/add-group.component';
import { MatDialog } from '@angular/material/dialog';
import { RemoveGroupComponent } from '..//remove-group/remove-group.component';
import {AttachToPagesComponent} from '../attach-to-pages/attach-to-pages.component';
import {SharedDataService} from '../shared-data.service';
import {GroupServiceService} from '../RoleGroupService/group-service.service'
import {AddPageComponent} from '../add-page/add-page.component'
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  chosenRowIsNull:boolean = true;
  message: any;
  flag:boolean=true;

  constructor(public dialog: MatDialog,
              private sharedService: SharedDataService,
              private grpService:GroupServiceService) { }


  openDialogForAddButton() {
    const dialogRef = this.dialog.open(AddGroupComponent, { panelClass: 'custom-dialog-container' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });

  }

  getCurrentRow(){
    
    this.sharedService.currentMessage.subscribe(res => {this.message = res});
    if(this.message==undefined){
      this.chosenRowIsNull = true;
    }
    else{
      this.chosenRowIsNull = false;
    }
  }

  openDialogForRemoveButton() {
    const dialogRef = this.dialog.open(RemoveGroupComponent, { panelClass: 'custom-dialog-container' });
    dialogRef.afterClosed().subscribe(result => { 
      console.log('The dialog was closed');    
    });
  }

  openDialogForAttachPanel(){
    
    const dialogRef = this.dialog.open(AttachToPagesComponent, { panelClass: 'custom-dialog-container' });
    dialogRef.afterClosed().subscribe(result => { 
      console.log('The dialog was closed');    
    });
  }

  ngOnInit(){

      this.grpService.ChangeMade$.subscribe(()=>{
        this.getCurrentRow();
      })
  }

}
