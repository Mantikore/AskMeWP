import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  getPagesCount(data): number {
    const dataCount = data.headers.get('x-wp-total') || 0;
    return (dataCount > 10) ? Math.ceil(dataCount / 10) : 0;
  }
}
