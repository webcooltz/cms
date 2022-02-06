import { EventEmitter, Injectable } from "@angular/core";

import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";

@Injectable({
  providedIn:'root'
})
export class DocumentService {

  documents: Document[] = [];

    // emits when contact is selected
    documentSelected = new EventEmitter<Document>();
    // HELP - emits when ID is selected
    documentIdSelected = new EventEmitter<Document>();
    // emits when changes are made
    documentsChanged = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents[+id];
  }

  addDocument(document: Document) {
    this.documents.push(document);
    this.documentsChanged.emit(this.documents.slice());
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentsChanged.emit(this.documents.slice());
 }

}
