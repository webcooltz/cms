import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  providers: [MessageService]
})
export class MessageListComponent implements OnInit {

  // @Output() messageWasSelected = new EventEmitter<Message>();

  messages: Message[] = [];

  constructor(private messageService: MessageService) {

  }

  ngOnInit() {
    // getting all contacts
    this.messages = this.messageService.getMessages();

    // detecting changes in contacts
    this.messageService.messagesChanged
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      )
  }

}
