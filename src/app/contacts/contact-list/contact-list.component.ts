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

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();

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

}
