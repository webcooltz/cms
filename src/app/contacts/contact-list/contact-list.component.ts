import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: Contact[] = [];
  private contactChangeSub!: Subscription;
  term!: string;

  constructor(private contactService: ContactService) {
   }

  ngOnInit() {
    this.contacts = this.contactService.fetchContacts();

    this.contactChangeSub = this.contactService.contactsChanged
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      )
  }

  ngOnDestroy(): void {
    this.contactChangeSub.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }

}
