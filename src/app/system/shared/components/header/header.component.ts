import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isLogged: Boolean;
    public innerWidth: any;
    error = '';

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.authService.isLoggedIn$.subscribe(isLogged => this.isLogged = isLogged, err => this.error = err.statusText);
        this.innerWidth = window.innerWidth;
    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
    }
}
