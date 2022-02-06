import { EventEmitter, Injectable } from "@angular/core";
import { Contact } from "./contact.model";

import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
  providedIn:'root'
})
export class ContactService {

  contacts: Contact [] =[];

  // emits when contact is selected
  contactSelected = new EventEmitter<Contact>();
  // HELP - emits when ID is selected
  contactIdSelected = new EventEmitter<Contact>();
  // emits when changes are made
  contactsChanged = new EventEmitter<Contact[]>();

  constructor() {
    // populates contacts array with the mock JSON file
    this.contacts = MOCKCONTACTS;
 }

  getContacts() {
    return this.contacts.slice();
  }

  // HELP - gets a single contact by ID(?)
  getContact(id: string): Contact {

    // for (var i = 0; i < this.contacts.length; i++) {
    //   if (this.contacts[i].id == id) {
    //     return this.contacts[i];
    //   }
    // }
    // return null as any;

    return this.contacts[+id];

  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
    this.contactsChanged.emit(this.contacts.slice());
  }

  deleteContact(contact: Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.contactsChanged.emit(this.contacts.slice());
 }

}
