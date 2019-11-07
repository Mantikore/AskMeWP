import { Component, OnDestroy, OnInit } from '@angular/core';
import { Author } from '../../models/author';
import { AuthService } from '../../services/auth.service';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.scss']
})
export class GreetingsComponent implements OnInit, OnDestroy {

  author = new Author();
  isLogged: boolean;
  error = '';
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
      private authService: AuthService
  ) { }

  ngOnInit(): void {
      this.isLogged = this.authService.isLogged();
      if (this.isLogged) {
        this.authService.showMe().pipe(takeUntil(this.ngUnsubscribe)).subscribe(loggedAuthor => {
          this.author = loggedAuthor;
        }, err => this.error = err.statusText);
      }
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onLogOut(): void {
      this.authService.logout();
      this.isLogged = false;
      this.author = new Author();
  }
}
