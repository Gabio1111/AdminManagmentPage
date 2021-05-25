import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PageTableDataSource} from './page-table-datasource';
import {Pages} from '../attach-to-pages/attach-to-pages.component';
import {GroupServiceService} from '../RoleGroupService/group-service.service';
import {SharedDataService} from '../shared-data.service'

@Component({
  selector: 'app-page-table',
  templateUrl: './page-table.component.html',
  styleUrls: ['./page-table.component.css']
})
export class PageTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Pages>;

  dataSource: PageTableDataSource;
  selectedRow: Pages;
  message:Pages;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['page_Id', 'name', 'root', 'route', 'css' ];
  

  constructor(private grpService:GroupServiceService,
              private sharedServices:SharedDataService) {
    this.dataSource = new PageTableDataSource(grpService);
  }

  selectRow(row) {
    this.selectedRow = row;
    this.sharedServices.changeMessage(this.selectedRow);
    
  }

  ngOnInit(): void {

    this.grpService.RefreshForPages$.subscribe(()=>{
    this.sharedServices.currentMessage.subscribe(res => (this.message = res));
    if(this.message.m_page_id==null){
      this.addPageToTable();
    }
    else{
      this.updatePageAtTable()
    }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.getData().subscribe( (res) =>{
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  addPageToTable(){
    this.dataSource.data.push(this.message);
    this.table.dataSource = this.dataSource.data;
    this.table.renderRows();
  }

  updatePageAtTable(){
    const idx_editedRow = this.dataSource.data.indexOf(this.selectedRow);
    this.dataSource.data.splice(idx_editedRow,1,this.message);
    this.table.dataSource = this.dataSource.data;
    this.table.renderRows();
  }
}
