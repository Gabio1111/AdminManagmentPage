import { Component, OnInit } from '@angular/core';
import {SharedDataService} from '../shared-data.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar'
import {GroupServiceService} from 'src/app/RoleGroupService/group-service.service'
import { FormControl } from '@angular/forms';
import { skip } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { promise } from 'selenium-webdriver';

 export interface Pages {
  m_page_id: number;
  m_page_id_arr:number[];
  m_page_name:string;
  ischecked:boolean;
  m_grp_id: number;
  m_root_page:number;
  m_page_route: string;
  m_page_css:string;
  
}

@Component({
  selector: 'app-attach-to-pages',
  templateUrl: './attach-to-pages.component.html',
  styleUrls: ['./attach-to-pages.component.css']
})

export class AttachToPagesComponent implements OnInit {
  

  constructor(private sharedService: SharedDataService,
              public dialogRef: MatDialogRef<AttachToPagesComponent>,
              public snack:MatSnackBar,
              private grpService:GroupServiceService
    ) { }

  pages:Pages[]  
  pageToReturn:Pages;
  selectedMessage:any;
  selectedValues =[];
  page_id_array=[];
  f_emptySelectionList:boolean=false;
  finishedLoading:Promise<boolean>;
  f_finished_visit: boolean=false;

  
  ngOnInit(): void {
    
    this.sharedService.currentMessage.subscribe(message => 
                          (this.selectedMessage = message)); //gives the chosen row
    this.grpService.getPages(this.selectedMessage.m_GRP_id).subscribe((res)=>{
      this.pages = res;
      this.finishedLoading=Promise.resolve(true);
    })
  }

  onOut(page:Pages){
   
    if(this.selectedValues.some((item)=>item.m_page_id == page.m_page_id)){
      this.removeElementFromArray(page);
    }
    else{
      this.selectedValues.push(page);
    }
    console.log(this.selectedValues);
  }


  checkValue(){
    if(this.pages != undefined){
      if(this.selectedValues.length==0 && this.f_emptySelectionList==false)
      {
        this.pages.forEach(element => {
          if(this.selectedMessage.m_GRP_id==element.m_grp_id){
              element.ischecked=true;
              this.selectedValues.push(element);
          }  
        });
        this.f_finished_visit=true;
      }
    }
 }

  removeElementFromArray(element: any) {
  this.selectedValues.forEach((value,index)=>{
      if(value==element) this.selectedValues.splice(index,1);
  });
  if(this.selectedValues.length==0){
    this.f_emptySelectionList=true;
  }
}


  clickedApply(){

      console.log(this.selectedValues);
      if(this.selectedMessage=='')
      {
        
        this.snack.open('nothing happened, must choose a group')._dismissAfter(3000)
      }
      else{
        this.selectedValues.forEach(element => {
          this.page_id_array.push(element.m_page_id);
        });
        this.pageToReturn = {m_grp_id: this.selectedMessage.m_GRP_id,
                              m_page_id_arr : this.page_id_array,
                              m_page_id:null,
                              m_page_name:null,
                              ischecked:null,
                              m_root_page:null,
                              m_page_css:null,
                              m_page_route:null
                            }
         this.grpService.attachPageToGrp(this.pageToReturn).subscribe(
          (res) => console.log(this.selectedMessage.m_GRP_id + ' :' + this.selectedValues)
         )
      } 
      this.dialogRef.close();
  }

}
