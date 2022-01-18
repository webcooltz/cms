import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  @Output() messageWasSelected = new EventEmitter<Message>();

  messages: Message[] = [
    new Message(1, "grade", "The grades for this assignment have been posted", "Bro. Jackson"),

    new Message(2, "when", "When is assignment 3 due", "Steve Johnson")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // OnMessageSelected(message: Message) {
  //   this.messageWasSelected.emit(message);
  // }

}
