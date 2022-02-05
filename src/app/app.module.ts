import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-list/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-list/document-item/document-item.component';
import { MessageItemComponent } from './messages/message-list/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-list/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';

import { DropdownDirective } from './shared/dropdown.directive';
import { ContactService } from './contacts/contact.service';
import { AppRoutingModule } from './app-routing.module';
import { DocumentStartComponent } from './documents/document-start/document-start.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentDetailComponent,
    DocumentListComponent,
    DocumentItemComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective,
    DocumentStartComponent,
    DocumentEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
