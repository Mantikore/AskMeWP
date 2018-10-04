import { Component} from '@angular/core';

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html'
})
export class SystemComponent {

    isLoggedIn = Boolean(window.localStorage.getItem('hasNewQuestionButton'));

    updateLoginStatus($event: Event) {
        $event ? this.isLoggedIn = true : this.isLoggedIn = false;
    }

}
