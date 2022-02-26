import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  providers: [MessageService]
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [];
  private messageChangeSub!: Subscription;

  @Output() messageWasSelected = new EventEmitter<Message>();
  @Output() message = new EventEmitter<Message>();

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messages = this.messageService.fetchMessages();

    this.messageChangeSub = this.messageService.messagesChanged
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      )
  }

  ngOnDestroy(): void {
    this.messageChangeSub.unsubscribe();
  }

}
