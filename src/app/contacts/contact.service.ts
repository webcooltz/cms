import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Contact } from "./contact.model";

import { HttpClient } from "@angular/common/http";

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

  constructor(private http: HttpClient) {
    // populates contacts array with the mock JSON file
    this.contacts = [];
    this.maxContactId = this.getMaxId();
 }

 storeContacts() {
  let contacts = this.getContacts();
  this.http
    .put(
      'https://cms-byui-dcf7f-default-rtdb.firebaseio.com/contacts.json',
       contacts
      )
    .subscribe(response => {
    console.log(response)
  });
}

fetchContacts() {
  this.http
    .get<Contact[]>(
      'https://cms-byui-dcf7f-default-rtdb.firebaseio.com/contacts.json'
    )
    .subscribe(contacts => {
      this.setContacts(contacts);
    }
    ,(error: any) => {
      console.log(error);
    }
    );

    return this.contacts.slice();
}

setContacts(contacts: Contact[]) {
  this.contacts = contacts;
  this.contactsChanged.next(this.contacts.slice());
}

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
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

    this.storeContacts();
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

    this.storeContacts();
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

    this.storeContacts();
 }

}
