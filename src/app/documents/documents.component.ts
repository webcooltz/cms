import { Component, OnInit } from '@angular/core';

import { Document } from './document.model';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  documentSelected!: Document;

  constructor() { }

  ngOnInit(): void {
  }

}
