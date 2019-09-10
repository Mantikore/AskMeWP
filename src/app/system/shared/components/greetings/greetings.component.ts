import { Component, OnInit } from '@angular/core';
import { Author } from '../../models/author';
import { AuthService } from '../../services/auth.service';
import { AuthorsService } from '../../services/authors.service';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.scss']
})
export class GreetingsComponent implements OnInit {

  author = new Author();
  isLogged: boolean;
  error = '';

  constructor(
      private authService: AuthService
  ) { }

  ngOnInit(): void {
      this.isLogged = this.authService.isLogged();
      if (this.isLogged) {
        this.authService.showMe().subscribe(loggedAuthor => {
          this.author = loggedAuthor;
        }, err => this.error = err.statusText);
      }
  }

  onLogOut(): void {
      this.authService.logout();
      this.isLogged = false;
      this.author = new Author();
  }
}
