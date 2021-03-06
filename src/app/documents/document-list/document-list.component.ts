import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Document[] = [];
  private documentChangeSub!: Subscription;

  constructor(private documentService: DocumentService) {
  }

  ngOnInit() {
    this.documents = this.documentService.fetchDocuments();

    this.documentChangeSub = this.documentService.documentsChanged
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      )
  }

  ngOnDestroy(): void {
    this.documentChangeSub.unsubscribe();
  }

}
