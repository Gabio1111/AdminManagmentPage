import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button'
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoleTabComponent } from './role-tab/role-tab.component';
import {HttpClientModule} from '@angular/common/http';
import {AddGroupComponent} from './add-group/add-group.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RemoveGroupComponent } from './remove-group/remove-group.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AttachToPagesComponent } from './attach-to-pages/attach-to-pages.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import { PageTableComponent } from './page-table/page-table.component';
import { AddPageComponent } from './add-page/add-page.component'
import {MatTabsModule} from '@angular/material/tabs';
import { DialogPagesComponent } from './dialog-pages/dialog-pages.component';
import { UpdatePageComponent } from './update-page/update-page.component';
import { DialogCashierComponent } from './dialog-cashier/dialog-cashier.component';
import { CashierToGrpComponent } from './cashier-to-grp/cashier-to-grp.component';
@NgModule({
  declarations: [
    AppComponent,
    RoleTabComponent,
    AddGroupComponent,
    DialogComponent,
    RemoveGroupComponent,
    AttachToPagesComponent,
    PageTableComponent,
    AddPageComponent,
    DialogPagesComponent,
    UpdatePageComponent,
    CashierToGrpComponent,
    DialogCashierComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatTabsModule
  
  ],
  providers: [ {
    provide: MatDialogRef,
    useValue: {}
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
