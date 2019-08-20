import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  getPagesCount(data) {
    let pages = 0;
    const dataCount = data.headers.get('x-wp-total') || 0;
    return pages = (dataCount > 10) ? Math.ceil(dataCount / 10) : 0;
  }
}
