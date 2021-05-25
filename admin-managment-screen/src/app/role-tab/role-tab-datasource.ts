import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { GroupServiceService } from '../RoleGroupService/group-service.service';


// TODO: Replace this with your own data model type
export class RoleTabItem {

  m_GRP_Name: string;
  m_GRP_id: number;
  m_Description: string;
}

// export class CashierModel {
//   m_GRP_Name: string;
//   m_GRP_id: number;
//   m_Description: string;
// }


/**
 * Data source for the RoleTab view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RoleTabDataSource extends DataSource<RoleTabItem> {
  data: RoleTabItem[] = []
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private grpService: GroupServiceService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */

  getData() {
    return this.grpService.getRoleGroups()
    .pipe(
      map(res=>this.data=res)
    )
  }

  
  connect(): Observable<RoleTabItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: RoleTabItem[]): RoleTabItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: RoleTabItem[]): RoleTabItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'roleName': return compare(a.m_GRP_Name, b.m_GRP_Name, isAsc);
        case 'id': return compare(+a.m_GRP_id, +b.m_GRP_id, isAsc);
        case 'description': return compare(a.m_Description, b.m_Description, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
