import { Component, OnInit } from '@angular/core';
import {Pages} from '../attach-to-pages/attach-to-pages.component';
import {GroupServiceService} from '../RoleGroupService/group-service.service';
import {SharedDataService} from '../shared-data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  pageToAdd:Pages;
  

  constructor(private grpService:GroupServiceService,
              public sharedService:SharedDataService,
              public dialogRef: MatDialogRef<AddPageComponent>) { }

  ngOnInit(): void {
  }

  addPageToTable(i_pageName:string,i_pageRoot:number,i_pageRout:string,i_pageCss:string){
    if(i_pageName!="" && i_pageRoot!=null){
      this.pageToAdd={
        m_grp_id:0,
        m_root_page:i_pageRoot,
        m_page_name:i_pageName,
        m_page_route:i_pageRout,
        m_page_css:i_pageCss,
        m_page_id_arr:[],
        m_page_id:null,
        ischecked:false
      }
      this.grpService.addPage(this.pageToAdd).subscribe((returnedIdentity:number) => {
        this.pageToAdd.m_page_id = returnedIdentity;
        console.log(this.pageToAdd);
        this.sharedService.changeMessage(this.pageToAdd);
        this.grpService.RefreshForPages$.next()
      })
    }

    this.dialogRef.close();
  }
  
}
