import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {Pages} from '../attach-to-pages/attach-to-pages.component'
import {GroupServiceService} from '../RoleGroupService/group-service.service'

// TODO: Replace this with your own data model type
// export interface Pages {
//   m_page_id: number;
//   m_page_id_arr:number[];
//   m_page_name:string;
//   ischecked:boolean;
//   m_grp_id: number;
//   m_root_page:number;
  
// }
// TODO: replace this with real data from your application


/**
 * Data source for the PageTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PageTableDataSource extends DataSource<Pages> {
  data: Pages[] =[]//= EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private grpService:GroupServiceService) {
    super();
  }

  getData() {
    return this.grpService.getPages()
    .pipe(
      map(res=>this.data=res)
    )
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Pages[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Pages[]): Pages[] {
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
  private getSortedData(data: Pages[]): Pages[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.m_page_name, b.m_page_name, isAsc);
        case 'page_Id': return compare(+a.m_page_id, +b.m_page_id, isAsc);
        case 'root' : return compare(+a.m_root_page, +b.m_root_page, isAsc);
        case 'rout' : return compare(+a.m_page_route, +b.m_page_route, isAsc);
        case 'css' : return compare(+a.m_page_css, +b.m_page_css, isAsc);
        
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
