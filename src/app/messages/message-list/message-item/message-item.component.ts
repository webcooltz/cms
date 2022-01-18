import { Message } from '../../message.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input() message!: Message;

  @Output() messageSelected = new EventEmitter<void>();

  onSelected() {
    this.messageSelected.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
