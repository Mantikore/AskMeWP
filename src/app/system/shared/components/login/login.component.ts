import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Author } from '../../models/author';
import { Message } from '../../models/message.model';
import { AuthorsService } from '../../services/authors.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    author = new Author();
    isLogged: boolean;
    user = {};
    error = '';
    message: Message;
    signUpForm = false;

    constructor(
        private authService: AuthService,
        private authorsService: AuthorsService
    ) {}

    ngOnInit() {
        this.message = new Message('danger', '');
        this.form = new FormGroup({
            'username': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(4)])
        });

        this.isLogged = this.authService.isLogged();

        if (this.isLogged) {
            const username = window.localStorage.getItem('username');
            this.user = this.authorsService.getAuthorBySlug(username).subscribe(me => {
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
        this.authService.auth().subscribe(data => {
            this.authorsService.getAuthorBySlug(window.localStorage.getItem('username')).subscribe(user => {
                const author = new Author();
                author.id = user['id'];
                author.name = user['name'];
                author.avatarUrl = user['avatar_urls']['96'];
                this.authService.login();
                this.isLogged = true;
                return this.author = author;
            });
        }, error => {
            this.authService.logout();
            if (error.error.code = 'invalid_username')  {
                this.showMessage('This username doesn\'t exist');
            }
            if (error.error.code = 'invalid_password') {
                this.showMessage('Password is incorrect');
            }
        });
    }

    onLogOut() {
        this.authService.logout();
        this.isLogged = false;
        this.author = new Author();
    }

    private showMessage(text: string, type: string = 'danger') {
        this.message = new Message(type, text);
        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);
    }
    onSignUpClick() {
        this.signUpForm = true;
    }
    signInEmitter(signIn) {
        this.signUpForm = signIn;
    }
    logInEmitter(author) {
        this.author = author;
        this.isLogged = true;
    }
}
