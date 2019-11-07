import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Author } from '../../models/author';
import { Message } from '../../models/message.model';
import { AuthorsService } from '../../services/authors.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    form: FormGroup;
    author = new Author();
    isLogged: boolean;
    error = '';
    message: Message;
    signUpForm = false;
    isLoaded = true;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private authService: AuthService,
        private authorsService: AuthorsService
    ) {}

    ngOnInit(): void {
        this.message = new Message('danger', '');
        this.form = new FormGroup({
            'username': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(4)])
        });

        this.authService.isLoggedIn$.subscribe(isLogged => {
            this.isLogged = isLogged;
            if (this.isLogged) {
                this.authService.showMe().subscribe(loggedAuthor => {
                  this.author = loggedAuthor;
                });
            }
        });
    }
    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }

    onLogIn(): void {
        const formData = this.form.value;
        this.error = '';
        this.isLoaded = false;
        window.localStorage.setItem('username', formData.username);
        this.authService.jwtAuth(formData.username, formData.password)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(data => {
            window.localStorage.setItem('token', data['token']);
            this.authorsService.getAuthorBySlug(window.localStorage.getItem('username'))
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe(userData => {
                this.author = userData;
                this.authService.login();
                this.isLogged = true;
                this.isLoaded = true;
            }, err => this.error = err.statusText);
        }, error => {
            this.authService.logout();
            this.isLoaded = true;
            if (error.error.code === '[jwt_auth] invalid_username')  {
                this.showMessage('This username doesn\'t exist');
            } else if (error.error.code === '[jwt_auth] incorrect_password') {
                this.showMessage('Password is incorrect');
            }
        });
    }

    onLogOut(): void {
        this.authService.logout();
        this.isLogged = false;
        this.author = new Author();
    }

    private showMessage(text: string, type: string = 'danger'): void {
        this.message = new Message(type, text);
        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);
    }
    onSignUpClick(): void {
        this.signUpForm = true;
    }
    signInEmitter(signIn): void {
        this.signUpForm = signIn;
    }
    logInEmitter(author): void {
        this.author = author;
        this.isLogged = true;
    }
}
