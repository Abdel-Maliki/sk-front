/**
 * @author abdel-maliki
 * Date : 21/10/2020
 */

export class Pagination {
  constructor(public page: number,
              public size: number,
              public filters?: { [key: string]: any },
              public totalElements?: number,
              public sort?: string,
              public direction?: number,
              public globalFilter?: string) {
  }
}
