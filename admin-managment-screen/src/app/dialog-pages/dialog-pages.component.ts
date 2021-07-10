import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {SharedDataService} from '../shared-data.service';
import {GroupServiceService} from '../RoleGroupService/group-service.service'
import {AddPageComponent} from '../add-page/add-page.component'
import { UpdatePageComponent } from '../update-page/update-page.component';

@Component({
  selector: 'app-dialog-pages',
  templateUrl: './dialog-pages.component.html',
  styleUrls: ['./dialog-pages.component.css']
})
export class DialogPagesComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private sharedService: SharedDataService,
              private grpService:GroupServiceService) { }

  ngOnInit(): void {
  }

  openDialogForAddPage(){
    const dialogRef = this.dialog.open(AddPageComponent,{panelClass: 'custom-dialog-container'});
    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');
    })
  }

  openDialogForUpdatePage(){
    const dialogRef = this.dialog.open(UpdatePageComponent,{panelClass: 'custom-dialog-container'});
    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');
    })
  }

}
