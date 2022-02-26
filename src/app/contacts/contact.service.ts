import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Contact } from "./contact.model";

import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
  providedIn:'root'
})
export class ContactService {

  contacts: Contact [] =[];
  maxContactId!: number;

  // emits when contact is selected
  contactSelected = new EventEmitter<Contact>();
  // HELP - emits when ID is selected
  contactIdSelected = new EventEmitter<Contact>();
  // emits when changes are made
  contactsChanged = new Subject<Contact[]>();

  constructor() {
    // populates contacts array with the mock JSON file
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
 }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {

    // for (var i = 0; i < this.contacts.length; i++) {
    //   if (this.contacts[i].id == id) {
    //     return this.contacts[i];
    //   }
    // }
    // return null as any;

    return this.contacts[+id];

  }

  addContact(newContact: Contact) {
    if (newContact == undefined || newContact == null) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactsChanged.next(this.contacts.slice());
  }

  getMaxId(): number {
    var maxId = 0;
    var currentId;
    for (var i = 0; i < this.contacts.length; i++) {
      currentId = parseInt(this.contacts[i].id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact == null || originalContact == undefined || newContact == null || newContact == undefined) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactsChanged.next(this.contacts.slice());
  }

  deleteContact(contact: Contact) {
    if (contact == null || contact == undefined) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.contactsChanged.next(this.contacts.slice());
 }

}
