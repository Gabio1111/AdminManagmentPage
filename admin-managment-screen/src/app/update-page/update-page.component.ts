import { Component, OnInit } from '@angular/core';
import {SharedDataService} from '../shared-data.service';
import {GroupServiceService} from '../RoleGroupService/group-service.service'
import {AddPageComponent} from '../add-page/add-page.component'
import { Pages } from '../attach-to-pages/attach-to-pages.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent implements OnInit {

  currentRow: Pages;
  pageToUpdate: Pages;
  p_ID:number;
 

  constructor(
            private sharedService: SharedDataService,
            private grpService:GroupServiceService,
            public dialogReff:MatDialogRef<UpdatePageComponent>
    ) { }

  ngOnInit(): void {
      this.sharedService.currentMessage.subscribe((res=>{
        this.currentRow = res
      }))
    if(this.currentRow.m_page_id!=null){
      this.p_ID = this.currentRow.m_page_id;
    }
  }
  updatePage(i_pageName:string,i_pageRoot:number,i_pageRout:string,i_pageCss:string){
   
    this.pageToUpdate={
      m_grp_id:0,
      m_root_page:i_pageRoot,
      m_page_name:i_pageName,
      m_page_route:i_pageRout,
      m_page_css:i_pageCss,
      m_page_id_arr:[],
      m_page_id:this.p_ID,
      ischecked:false
    }
    this.grpService.updatePage(this.pageToUpdate).subscribe((returnedIdentity:number) => {
      //this.pageToUpdate.m_page_id = returnedIdentity;
      console.log(this.pageToUpdate);
      this.sharedService.changeMessage(this.pageToUpdate);
      this.grpService.RefreshForPages$.next()
      
    })
    this.dialogReff.close();
  }

}
