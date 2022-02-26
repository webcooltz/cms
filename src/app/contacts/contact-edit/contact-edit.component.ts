import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

// import { DndModule } from 'ng2-dnd';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  id!: string;
  contact!: Contact;
  originalContact!: Contact;
  editMode: boolean = false;

  groupContacts: Contact[] = [];

  subscription!: Subscription;

  @ViewChild('f') cForm!: NgForm;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {

          // const value = this.cForm.value;
          this.id = params['id'];

          if (this.id == undefined || this.id == null) {
            this.editMode = false;
            return;
          }
          this.originalContact = this.contactService.getContact(this.id);

          if (this.originalContact == undefined || this.originalContact == null) {
            return;
          }
          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));

          if (this.groupContacts != undefined && this.groupContacts != null) {
            this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
          }

        }
      )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact("", value.name, value.email, value.phone, value.imageUrl, value.group);
    if (this.editMode == true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.editMode = false;
    form.reset();
    this.router.navigate([''], {relativeTo: this.route});
  }

  onCancel() {
    this.editMode = false;
    this.cForm.reset();
    this.router.navigate([''], {relativeTo: this.route});
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
       return;
    }
    this.groupContacts.push(selectedContact);
 }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }


}
