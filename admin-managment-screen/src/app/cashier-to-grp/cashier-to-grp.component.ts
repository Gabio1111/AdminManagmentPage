import { Component, OnInit } from '@angular/core';
import { GroupServiceService } from '../RoleGroupService/group-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface Cashier{
    m_CashierId:number;
    m_CashierGrpId:number;
    m_CashierKey:string;
    m_CashierPassword:string;
    m_CashierName:string;
    m_CashierDisabled:boolean;
    m_CashierAreaControl:boolean;
    m_DelFlag:boolean;
    m_UpdateNum:number;
}

@Component({
  selector: 'app-cashier-to-grp',
  templateUrl: './cashier-to-grp.component.html',
  styleUrls: ['./cashier-to-grp.component.css']
})
export class CashierToGrpComponent implements OnInit {

  m_cashier:Cashier;

  constructor(private grp_service:GroupServiceService,
              public dialogRef: MatDialogRef<CashierToGrpComponent>
              ) { }

  ngOnInit(): void {
  }

  attachCashier(i_CashierId:number, i_grpId:number):void{
    this.m_cashier={
      m_CashierId:i_CashierId,
      m_CashierGrpId:i_grpId,
      m_CashierKey:undefined,
      m_CashierPassword:undefined,
      m_CashierName:undefined,
      m_CashierDisabled:undefined,
      m_CashierAreaControl:undefined,
      m_DelFlag:undefined,
      m_UpdateNum:undefined
    }
    this.grp_service.attachCashierToGrp(this.m_cashier).subscribe(()=>console.log(this.m_cashier))
    this.dialogRef.close()
  }

}
