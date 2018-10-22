import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import set = Reflect.set;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    // @Input() hasNewQuestionButton: boolean;

    isLogged: Boolean;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.isLoggedIn$.subscribe(isLogged => this.isLogged = isLogged);
    }
}
