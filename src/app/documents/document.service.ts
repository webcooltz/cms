import { EventEmitter, Injectable } from "@angular/core";
import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Subject } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class DocumentService {

  documents: Document[] = [];
  maxDocumentId: number;

    // emits when contact is selected
    documentSelected = new EventEmitter<Document>();
    // HELP - emits when ID is selected
    documentIdSelected = new EventEmitter<Document>();
    // emits when changes are made
    documentsChanged = new Subject<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents[+id];
  }

  addDocument(newDocument: Document) {
    if (newDocument == undefined || newDocument == null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentsChanged.next(this.documents.slice());
  }

  getMaxId(): number {
    var maxId = 0;
    var currentId;
    for (var i = 0; i < this.documents.length; i++) {
      currentId = parseInt(this.documents[i].id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument == null || originalDocument == undefined || newDocument == null || newDocument == undefined) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentsChanged.next(this.documents.slice());
  }

  deleteDocument(document: Document) {
    if (document == null || document == undefined) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentsChanged.next(this.documents.slice());
 }

}
