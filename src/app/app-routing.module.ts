// app-essential
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// contacts and children
import { ContactsComponent } from "./contacts/contacts.component";
import { ContactEditComponent } from "./contacts/contact-edit/contact-edit.component";
// documents and children
import { DocumentsComponent } from "./documents/documents.component";
import { DocumentStartComponent } from "./documents/document-start/document-start.component";
import { DocumentDetailComponent } from "./documents/document-detail/document-detail.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
// messages list and children
import { MessageListComponent } from "./messages/message-list/message-list.component";
import { ContactDetailComponent } from "./contacts/contact-detail/contact-detail.component";
import { ContactStartComponent } from "./contacts/contact-start/contact-start.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'documents', component: DocumentsComponent, children: [
    { path: '', component: DocumentStartComponent },
    { path: 'new', component: DocumentEditComponent},
    { path: ':id', component: DocumentDetailComponent},
    { path: ':id/edit', component: DocumentEditComponent}
  ]},
  { path: 'messages', component: MessageListComponent },
  { path: 'contacts', component: ContactsComponent, children: [
    { path: '', component: ContactStartComponent },
    { path: 'new', component: ContactEditComponent},
    { path: ':id', component: ContactDetailComponent},
    { path: ':id/edit', component: ContactEditComponent}
  ] }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
