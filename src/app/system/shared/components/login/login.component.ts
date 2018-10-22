import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthorsService } from '../../services/authors.service';
import { AuthService } from '../../services/auth.service';
import { Author } from '../../models/author';
import { Message } from '../../models/message.model';

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

    // @Output() loginEmitter = new EventEmitter<boolean>();

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit() {

        this.message = new Message('danger', '');
        this.form = new FormGroup({
            'username': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(4)])
        });

        this.isLogged = this.authService.isLogged();

        if (this.isLogged) {
            // this.loginEmitter.emit(this.isLogged);
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
            // this.loginEmitter.emit(this.isLogged);
            return this.author = author;
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
        // this.loginEmitter.emit(this.isLogged);
        this.author = new Author();
    }

    private showMessage(text: string, type: string = 'danger') {
        this.message = new Message(type, text);
        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);
    }
}
