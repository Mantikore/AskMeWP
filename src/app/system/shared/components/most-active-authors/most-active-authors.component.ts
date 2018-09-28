import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { Author } from '../../models/author';

@Component({
  selector: 'app-most-active-authors',
  templateUrl: './most-active-authors.component.html',
  styleUrls: ['./most-active-authors.component.scss']
})
export class MostActiveAuthorsComponent implements OnInit {
  authors: Author[];
  constructor(private authorsService: AuthorsService) { }

  ngOnInit() {
    this.authorsService.getAuthors().subscribe(data => {
        const authors = [];
        for (const item of Object.values(data)) {
            const author = new Author();
            author.id = item['id'];
            author.name = item['name'];
            author.avatarUrl = item['avatar_urls']['96'];
            authors.push(author);
        }
        return this.authors = authors;
    });
  }

}
