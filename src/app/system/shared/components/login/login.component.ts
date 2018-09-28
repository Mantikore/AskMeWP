import { Component, OnInit } from '@angular/core';
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
    user;
    error = '';

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

        this.isLogged = Boolean(window.localStorage.getItem('isLogged'));

        if (this.isLogged) {
            this.user = JSON.parse(window.localStorage.getItem('user'));
            this.author.id = this.user.id;
            this.author.name = this.user.name;
            this.author.avatarUrl = this.user.avatar_urls['96'];
        }
        console.log(this.isLogged);
    }

    onSubmit() {
        const formData = this.form.value;
        window.localStorage.setItem('username', formData.username);
        window.localStorage.setItem('password', formData.password);
        this.authService.tryLogin().subscribe(user => {
            const author = new Author();
            author.id = user.id;
            author.name = user.name;
            author.avatarUrl = user.avatar_urls['96'];
            this.authService.login();
            window.localStorage.setItem('user', JSON.stringify(user));
            console.log(author);
            this.isLogged = true;
            return this.author = author;
        }, error => {
            if (error.error.code = 'invalid_username')  {
                this.error = 'This username doesn\'t exist';
            }
            if (error.error.code = 'invalid_password') {
                this.error = 'Password is incorrect';
            }
            this.authService.logout();
        });
    }

    onLogOut() {
        this.authService.logout();
        this.isLogged = false;
        this.author = new Author();
    }
}
