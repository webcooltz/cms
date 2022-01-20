import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  // new event emitter to output the data for the document
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  // an array of document objects - dummy data for our list of documents
  documents: Document[] = [
    new Document(1, "wdd 430", "full stack web development", "byui.edu", "web dev"),

    new Document(2, "wdd 100", "intro to web design and development", "byui.edu", "web dev"),

    new Document(3, "cit 230", "frontend web development", "byui.edu", "web dev"),

    new Document(4, "cit 260", "object-oriented development", "byui.edu", "web dev")
  ];

  // the method that will call the event emitter to pass the data
  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
