import { Component, OnInit } from '@angular/core';

import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentService]
})
export class DocumentsComponent implements OnInit {

  selectedDocument!: Document;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
     // waits for changes in contact selected, passes it up to the service
     this.documentService.documentSelected
     .subscribe(
       (document: Document) => {
         this.selectedDocument = document;
       }
     )
  }

}
