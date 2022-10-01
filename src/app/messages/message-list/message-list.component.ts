import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1, 'This is the Subject', 'This is the Message Text', 'I am the Sender'), new Message(1, 'This is another Subject', 'This is the other Message Text', 'I am the Other Sender'), new Message(1, 'Please work', 'I really want this to work.', 'Michael')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
