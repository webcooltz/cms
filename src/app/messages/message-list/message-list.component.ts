import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

    new Message(2, "when", "When is assignment 3 due", "Steve Johnson"),

    new Message(3, "saturday", "Assignment 3 is due on Saturday at 11:30 PM", "Bro. Jackson")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    // this.messageWasSelected.emit(message);
    this.messages.push(message);
  }

  // OnMessageSelected(message: Message) {
  //   this.messageWasSelected.emit(message);
  // }

}
