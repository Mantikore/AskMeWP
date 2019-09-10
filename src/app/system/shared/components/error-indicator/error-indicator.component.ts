import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-indicator',
  templateUrl: './error-indicator.component.html',
  styleUrls: ['./error-indicator.component.scss']
})
export class ErrorIndicatorComponent implements OnInit {

  constructor() { }

  loaded = false;
  @Input() err: number;

  ngOnInit() {
     setTimeout(() => this.loaded = true, 1000);
  }
}
