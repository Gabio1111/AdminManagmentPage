import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RoleTabDataSource, RoleTabItem } from './role-tab-datasource';
import { GroupServiceService } from 'src/app/RoleGroupService/group-service.service'
import { SharedDataService } from '../shared-data.service';
import { _isNumberValue } from '@angular/cdk/coercion';
import { last } from 'rxjs/operators';
import { Pages } from '../attach-to-pages/attach-to-pages.component';

@Component({
  selector: 'app-role-tab',
  templateUrl: './role-tab.component.html',
  styleUrls: ['./role-tab.component.css']
})
export class RoleTabComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<RoleTabItem>;
  dataSource: RoleTabDataSource;

  selectedRow:RoleTabItem;// contains the index 
  messageAddGrp:RoleTabItem;
  message:any;
  tabItem:RoleTabItem;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'roleName', 'description'];
  

  constructor(private grpService: GroupServiceService,
              private sharedService:SharedDataService) {
    this.dataSource = new RoleTabDataSource(grpService);
  }
  
  ngOnInit(){

    console.log("on init")
    this.grpService.refreshNeeded$.subscribe(() => {
      this.sharedService.currentMessage.subscribe(res => (this.message = res));
      if(this.message.toString()=='remove'){
        this.removeGroupFromTable();
      }
      else{
        this.addGroupToTable();
      }
    });
     
  }

  
  ngAfterViewInit(): void {
    console.log("view init")  
    this.dataSource.getData().subscribe(res => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;})      
  }
  
   selectRow(row) {
    this.selectedRow = row;
    this.sharedService.changeMessage(this.selectedRow);
    this.grpService.ChangeMade$.next();
  }

  removeGroupFromTable(){
    if(this.selectedRow!=null){
      this.table.dataSource = this.dataSource.data.filter((value,key)=>{
        return value.m_GRP_id != this.selectedRow.m_GRP_id;
      })
    }
  }

  addGroupToTable(){
    this.sharedService.currentMessage.subscribe(res => {
      this.messageAddGrp = res
    });
    if(this.messageAddGrp.m_GRP_Name!=""){
      
      this.dataSource.data.push(this.messageAddGrp);
      this.table.dataSource = this.dataSource.data;
      this.table.renderRows();
      }

  }

}


