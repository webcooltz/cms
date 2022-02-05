import { Message } from '../../message.model'
import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  currentSender = "Tyler Tucker";

  @ViewChild('msgInput') msgInputRef!: ElementRef;
  @ViewChild('subInput') subInputRef!: ElementRef;

  // @Output() addMessageEvent = new EventEmitter<Message>();

  onSendMessage() {
    let subject = this.subInputRef.nativeElement.value;
    let msgText = this.msgInputRef.nativeElement.value;
    let newMsg = new Message('0', subject, msgText, this.currentSender);

    // this.addMessageEvent.emit(newMsg);

    this.messageService.addMessage(newMsg);
  }

  onClear() {
    this.msgInputRef.nativeElement.value = ' ';
    this.subInputRef.nativeElement.value = ' ';
  }

  constructor(private messageService: MessageService) { }

  ngOnInit() {

  }

}
