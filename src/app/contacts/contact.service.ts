import { EventEmitter, Injectable } from "@angular/core";
import { Contact } from "./contact.model";

import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
  providedIn:'root'
})
export class ContactService {

  contactSelected = new EventEmitter<Contact>();

  contacts: Contact [] =[];

  constructor() {
    this.contacts = MOCKCONTACTS;
 }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (let contact in this.contacts) {
      if (id == contact.id) {
        return contact;
      }
    }
    return null;
  }

}
