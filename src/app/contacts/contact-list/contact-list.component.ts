import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];

  selectedContact!: Contact | null;

  onSelected(contact: Contact) {
    this.contactService.contactSelected.emit(contact);
  }

  constructor(private contactService: ContactService) {
   }

  ngOnInit() {
    // getting all contacts
    this.contacts = this.contactService.getContacts();

    // HELP - getting a specific contact
    // this.selectedContact = this.contactService.getContact(id);

    // detecting changes in contacts
    this.contactService.contactsChanged
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      )
  }

}
