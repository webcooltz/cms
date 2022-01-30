import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {

  selectedContact!: Contact;

  // HELP
  selectedId!: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {

    // waits for changes in contact selected, passes it up to the service
    this.contactService.contactSelected
      .subscribe(
        (contact: Contact) => {
          this.selectedContact = contact;
        }
      )

    // HELP - waits for changes in contact searched, passes it up to the service(?)
      this.contactService.contactIdSelected
        .subscribe(
          (id: string) => {
            this.selectedId = id;
        }
        )

  }

}
