import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {SharedDataService} from '../shared-data.service';
import {GroupServiceService} from '../RoleGroupService/group-service.service'
import { CashierToGrpComponent } from '../cashier-to-grp/cashier-to-grp.component';

@Component({
  selector: 'app-dialog-cashier',
  templateUrl: './dialog-cashier.component.html',
  styleUrls: ['./dialog-cashier.component.css']
})
export class DialogCashierComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private sharedService: SharedDataService,
    private grpService:GroupServiceService) { }

  ngOnInit(): void {
  }

  openDialogForCashierInsertion(){
    const dialogRef = this.dialog.open(CashierToGrpComponent,{panelClass: 'custom-dialog-container'});
    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');
    })
  }
}
