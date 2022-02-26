import { Message } from '../../message.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from '../../message.service';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input() message!: Message;

  messageSender!: string;

  @Output() messageSelected = new EventEmitter<void>();

  onSelected() {
    this.messageSelected.emit();
  }

  constructor(private messageService: MessageService,
              private contactService: ContactService) {
   }

  ngOnInit() {
    let message = this.messageService.getMessage(this.message.id);
    const contact: Contact = this.contactService.getContact(message.sender);
    this.messageSender = contact.name;
  }

}
