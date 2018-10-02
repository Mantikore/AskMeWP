import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html'
})
export class SystemComponent implements OnInit {

    isLoggedIn = Boolean(window.localStorage.getItem('isLogged'));

    updateLoginStatus($event: Event) {
        if ($event) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    }

    ngOnInit() {

    }
}
