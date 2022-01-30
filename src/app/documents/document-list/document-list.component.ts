import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  // an array of document objects - dummy data for our list of documents
  documents: Document[] = [];

  selectedDocument!: Document | null;

  onSelectedDocument(document: Document) {
    this.documentService.documentSelected.emit(document);
  }

  constructor(private documentService: DocumentService) {

  }

  ngOnInit() {
    // getting all contacts
    this.documents = this.documentService.getDocuments();

    // HELP - getting a specific contact
    // this.selectedContact = this.contactService.getContact(id);

    // detecting changes in contacts
    this.documentService.documentsChanged
      .subscribe(
        (contacts: Document[]) => {
          this.documents = contacts;
        }
      )
  }

}
