import { EventEmitter, Injectable } from "@angular/core";
import { Message } from "./message.model";
// import { MOCKMESSAGES } from "./MOCKMESSAGES";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class MessageService {

  messages: Message[] = [];
  maxMessageId!: number;

  messageSelected = new EventEmitter<Message>();
  messagesChanged = new Subject<Message[]>();

  constructor(private http: HttpClient) {
    this.messages = [];
    this.maxMessageId = this.getMaxId();
  }

  storeMessages() {
    let messages = this.getMessages();
    this.http
      .put(
        'https://cms-byui-dcf7f-default-rtdb.firebaseio.com/messages.json',
         messages
        )
      .subscribe(response => {
      console.log(response)
    });
  }

  fetchMessages() {
    this.http
      .get<Message[]>(
        'https://cms-byui-dcf7f-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe(messages => {
        this.setMessages(messages);
      }
      ,(error: any) => {
        console.log(error);
      }
      );

      return this.messages.slice();
  }

  setMessages(messages: Message[]) {
    this.messages = messages;
    this.messagesChanged.next(this.messages.slice());
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    return this.messages[+id];
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }
    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);
    this.messagesChanged.next(this.messages.slice());

    this.storeMessages();
  }

  getMaxId(): number {
    var maxId = 0;
    var currentId;
    for (var i = 0; i < this.messages.length; i++) {
      currentId = parseInt(this.messages[i].id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }
    const pos = this.messages.indexOf(originalMessage);
    if (pos < 0) {
      return;
    }
    newMessage.id = originalMessage.id;
    this.messages[pos] = newMessage;
    this.messagesChanged.next(this.messages.slice());

    this.storeMessages();
  }

  deleteMessage(message: Message) {
    if (!message) {
       return;
    }
    const pos = this.messages.indexOf(message);
    if (pos < 0) {
       return;
    }
    this.messages.splice(pos, 1);
    this.messagesChanged.next(this.messages.slice());

    this.storeMessages();
 }

}
