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
    // for (var i = 0; i < this.documents.length; i++) {
    //   if (this.documents[i].id == id) {
    //     return this.documents[i];
    //   } else {
    //     return this.documents[0];
    //   }
    // }
    // return null as any;

    // configuring route paramters: 5:30
    return this.documents[+id];
  }

  addDocument(document: Document) {
    this.documents.push(document);
    this.documentsChanged.emit(this.documents.slice());
  }

}
