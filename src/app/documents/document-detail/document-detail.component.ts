import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/windref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  document!: Document;
  id!: string;
  nativeWindow: any;

  constructor(private documentService: DocumentService,
              private route: ActivatedRoute,
              private windRefService: WindRefService,
              private router: Router) {
               }

  ngOnInit() {

    // gets route by parameter ID
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.document = this.documentService.getDocument(this.id);
        }
      );

      this.nativeWindow = this.windRefService.getNativeWindow();

  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate([''], {relativeTo: this.route});
 }

//  onNew() {
//    this.router.navigate(['id']);
//  }

}
