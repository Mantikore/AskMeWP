import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthorsService } from '../../services/authors.service';
import { AuthService } from '../../services/auth.service';
import { Author } from '../../models/author';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    author = new Author();
    isLogged = false;
    user = {};
    error = '';

    @Output() loginEmitter = new EventEmitter<boolean>();

    constructor(
        private  authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private authorsService: AuthorsService
    ) {}

    ngOnInit() {

        this.form = new FormGroup({
            'username': new FormControl(),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });

        this.isLogged = this.authService.isLogged();

        if (this.isLogged) {
            this.user = this.authService.getMe().subscribe(me => {
                this.author.id = me['id'];
                this.author.name = me['name'];
                this.author.avatarUrl = me['avatar_urls']['96'];
            });
        }
    }

    onLogIn() {
        const formData = this.form.value;
        this.error = '';
        window.localStorage.setItem('username', formData.username);
        window.localStorage.setItem('password', formData.password);
        this.authService.getMe().subscribe(user => {
            const author = new Author();
            author.id = user['id'];
            author.name = user['name'];
            author.avatarUrl = user['avatar_urls']['96'];
            this.authService.login();
            window.localStorage.setItem('user', JSON.stringify(user));
            this.isLogged = true;
            this.loginEmitter.emit(this.isLogged);
            return this.author = author;
        }, error => {
            this.authService.logout();
            if (error.error.code = 'invalid_username')  {
                return this.error = 'This username doesn\'t exist';
            }
            if (error.error.code = 'invalid_password') {
                return this.error = 'Password is incorrect';
            }
        });
    }

    onLogOut() {
        this.authService.logout();
        this.isLogged = false;
        this.loginEmitter.emit(this.isLogged);
        this.author = new Author();
    }
}
