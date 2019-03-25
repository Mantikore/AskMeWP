import { Component, HostBinding, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html'
})
export class SystemComponent implements OnInit {
    public innerWidth: any;
    ngOnInit() {
        this.innerWidth = window.innerWidth;
    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
    }
}
