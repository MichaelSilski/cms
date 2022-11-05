import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: number;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {

}

  ngOnInit() {
    this.route.params.subscribe (
      (params: Params) => {
        this.id = params.id.value;
        if (this.id === null) {
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(params.id.value);
        if (this.originalDocument === null) {
          return
        }
        this.editMode = true
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
    }) 
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document();
    newDocument.id = value.id;
    newDocument.name = value.name;
    newDocument.description = value.description;
    newDocument.url = value.url;
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.editMode = false;
    form.reset();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
