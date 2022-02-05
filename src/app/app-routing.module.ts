// app-essential
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// contacts and children
import { ContactsComponent } from "./contacts/contacts.component";
// documents and children
import { DocumentsComponent } from "./documents/documents.component";
import { DocumentStartComponent } from "./documents/document-start/document-start.component";
import { DocumentDetailComponent } from "./documents/document-detail/document-detail.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
// messages list and children
import { MessageListComponent } from "./messages/message-list/message-list.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'documents', component: DocumentsComponent, children: [
    { path: '', component: DocumentStartComponent },
    { path: 'new', component: DocumentEditComponent},
    { path: ':id', component: DocumentDetailComponent},
    { path: ':id/edit', component: DocumentEditComponent}
  ]},
  { path: 'messages', component: MessageListComponent },
  { path: 'contacts', component: ContactsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
