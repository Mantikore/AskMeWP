import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { Author } from '../../models/author';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-most-active-authors',
  templateUrl: './most-active-authors.component.html',
  styleUrls: ['./most-active-authors.component.scss']
})
export class MostActiveAuthorsComponent implements OnInit {
  authors: Observable<Author[]>;
  error = '';

  constructor(private authorsService: AuthorsService) {
  }

  ngOnInit() {
    this.authors = this.authorsService.getAuthors();
  }
}
