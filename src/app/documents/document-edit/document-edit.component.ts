import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  id!: string;
  originalDocument!: Document;
  document!: Document;
  editMode: boolean = false;

  subscription!: Subscription;

  @ViewChild('f') dForm!: NgForm;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {

          this.id = params['id'];

          if (this.id == undefined || this.id == null) {
            this.editMode = false;
            return;
          }

          this.originalDocument = this.documentService.getDocument(this.id);

          if (this.originalDocument == undefined || this.originalDocument == null) {
            return;
          }

          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document("", value.name, value.description, value.url, value.group);
    if (this.editMode == true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.editMode = false;
    form.reset();
    this.router.navigate([''], {relativeTo: this.route});
  }

  onCancel() {
    this.editMode = false;
    this.dForm.reset();
    this.router.navigate([''], {relativeTo: this.route});
  }

}
