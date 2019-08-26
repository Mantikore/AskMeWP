import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { Author } from '../../models/author';

@Component({
  selector: 'app-most-active-authors',
  templateUrl: './most-active-authors.component.html',
  styleUrls: ['./most-active-authors.component.scss']
})
export class MostActiveAuthorsComponent implements OnInit {
  authors: Author[] = [];
  isLoaded = false;

  constructor(private authorsService: AuthorsService) {}

  ngOnInit() {
    this.authorsService.getAuthors().subscribe(data => {
        this.authors = data;
        this.isLoaded = true;
    });
  }
}
