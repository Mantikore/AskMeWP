import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {

    @Input() pages: number;
    pagesArr = [];

    activePage = +this.route.snapshot.paramMap.get('page');
    pageName;


    constructor(private route: ActivatedRoute) {
    }

    ngOnChanges() {
      let i = 1;
      while (i <= this.pages) {
          this.pagesArr.push(i);
          i++;
      }
      this.pageName = this.route.url['_value']['0']['path'];
      console.log(this.pageName);
    }

    onPageClick(page) {
        this.activePage = page;
    }
    onPrevClick() {
      if (this.activePage !== 1) {
          this.activePage = this.activePage - 1;
      }
    }
    onNextClick() {
        if (this.activePage !== this.pages) {
            this.activePage = this.activePage + 1;
        }
    }
}
