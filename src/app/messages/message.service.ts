import { EventEmitter, Injectable } from "@angular/core";
import { Message } from "./message.model";
import { MOCKMESSAGES } from "./MOCKMESSAGES";

@Injectable({
  providedIn:'root'
})
export class MessageService {

  messages: Message[] = [];

  // emits when contact is selected
  messageSelected = new EventEmitter<Message>();
  // emits when changes are made
  messagesChanged = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (var i = 0; i < this.messages.length; i++) {
      if (this.messages[i].id == id) {
        return this.messages[i];
      } else {
        return this.messages[0];
      }
    }
    return null as any;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messagesChanged.emit(this.messages.slice());
  }

}
