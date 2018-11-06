import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../models/message.model';
import { AuthService } from '../../services/auth.service';
import { Author } from '../../models/author';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    form: FormGroup;
    error = '';
    message: Message;
    isLogged: boolean;
    @Output() signUpForm = new EventEmitter();
    @Output() author = new EventEmitter();

  constructor(
      private authService: AuthService
  ) { }

  ngOnInit() {
      this.message = new Message('danger', '');
      this.form = new FormGroup({
          'username': new FormControl(null, [Validators.required]),
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'password': new FormControl(null, [Validators.required, Validators.minLength(4)])
      });
  }

  onSignUp() {
      const formData = this.form.value;
      this.error = '';
      this.authService.signUp(formData.username, formData.email, formData.password).subscribe(user => {
              const author = new Author();
              console.log(user);
              author.id = user['id'];
              author.name = user['name'];
              author.avatarUrl = user['avatar_urls']['96'];
              window.localStorage.setItem('username', formData.username);
              window.localStorage.setItem('password', formData.password);
              this.authService.login();
              this.isLogged = true;
              this.signUpForm.emit(false);
              return this.author.emit(author);
      }, error => {
          this.authService.logout();
          console.log(error);
          if (error.error.code = '406')  {
              this.showMessage('This email or username is already exists');
          }

      });
  }
  private showMessage(text: string, type: string = 'danger') {
      this.message = new Message(type, text);
      window.setTimeout(() => {
          this.message.text = '';
      }, 5000);
  }
  onLogInClick() {
      this.signUpForm.emit(false);
  }
}
