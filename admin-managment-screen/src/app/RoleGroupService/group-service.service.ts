import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RoleTabItem } from 'src/app/role-tab/role-tab-datasource';
import {Pages} from '../attach-to-pages/attach-to-pages.component';
import {SharedDataService} from '../shared-data.service'
import { Cashier } from '../cashier-to-grp/cashier-to-grp.component';



@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {
 
  rootURL='http://localhost:44397/api/Cashier';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'my-auth-token'
    })
  };

  private _refreshNeeded$ = new Subject<void>();
  private _changeMade$ = new Subject<void>();
  private _refreshForPages$ = new Subject<void>();
  private _newAction$ = new Subject<void>();

  get newAction$(){
    return this._newAction$;
  }

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

  get ChangeMade$(){
    return this._changeMade$;
  }

  get RefreshForPages$(){
    return this._refreshForPages$;
  }

  constructor(private http:HttpClient,
              public sharedService:SharedDataService) { }

 
  getRoleGroups():Observable<RoleTabItem[]>{
      return this.http.get<RoleTabItem[]>(this.rootURL + '/GetGRPs',this.httpOptions);
  }

  addRoleGroup(item:RoleTabItem){
    return this.http.post(this.rootURL + '/AddGroups', item, this.httpOptions)

  }
  deleteGroup(id:number) {
    return this.http.delete(this.rootURL+ '/DeleteGroup/'+ id  ,this.httpOptions)
    
  }

  attachPageToGrp(i_page:Pages){
    return this.http.post(this.rootURL + '/GroupsToPages', i_page, this.httpOptions)
   
  }

  getPages(grp_id?:number):Observable<Pages[]>{
   
    if(grp_id!=null){
      return this.http.get<Pages[]>(this.rootURL + '/GetPages/' + grp_id,this.httpOptions);
    }
    else{
      return this.http.get<Pages[]>(this.rootURL + '/GetPages',this.httpOptions);
    }
  }

  addPage(i_page:Pages){
    return this.http.post(this.rootURL + '/AddPages', i_page ,this.httpOptions);
  }

  updatePage(i_page:Pages){
    return this.http.put(this.rootURL + "/UpdatePage", i_page, this.httpOptions);
  }

  attachCashierToGrp(i_cashier:Cashier){
    return this.http.put(this.rootURL + "/CtoP" , i_cashier,this.httpOptions);
  }
}
   


