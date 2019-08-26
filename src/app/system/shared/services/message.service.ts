import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: Message;

  constructor() { }

  private showMessage(text: string, type: string = 'danger'): void {
      this.message = new Message(type, text);
      window.setTimeout(() => {
          this.message.text = '';
      }, 5000);
  }
}
