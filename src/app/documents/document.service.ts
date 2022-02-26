import { EventEmitter, Injectable } from "@angular/core";
import { Document } from "./document.model";
// import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn:'root'
})
export class DocumentService {

  documents: Document[] = [];
  maxDocumentId: number;

    documentSelected = new EventEmitter<Document>();
    documentIdSelected = new EventEmitter<Document>();
    documentsChanged = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.documents = [];
    this.maxDocumentId = this.getMaxId();
  }

  storeDocuments() {
    let documents = this.getDocuments();
    this.http
      .put(
        'https://cms-byui-dcf7f-default-rtdb.firebaseio.com/documents.json',
         documents
        )
      .subscribe(response => {
      console.log(response)
    });
  }

  fetchDocuments() {
    this.http
      .get<Document[]>(
        'https://cms-byui-dcf7f-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe(documents => {
        this.setDocuments(documents);
      }
      ,(error: any) => {
        console.log(error);
      }
      );

      return this.documents.slice();
  }

  setDocuments(documents: Document[]) {
    this.documents = documents;
    this.documentsChanged.next(this.documents.slice());
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents[+id];
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentsChanged.next(this.documents.slice());

    this.storeDocuments();
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
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentsChanged.next(this.documents.slice());

    this.storeDocuments();
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
    this.documentsChanged.next(this.documents.slice());

    this.storeDocuments();
 }

}
