import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { MaxValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document>();

  documentsList: Document[] = [];
  maxDocumentId: Number;
  constructor() {
    this.documentsList = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }
  getDocuments(): Document[] {
    return this.documentsList.slice();
  }
  getDocument(id: string): Document {
    for (let document of this.documentsList) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  } 
  
  getMaxId(): Number {
    let maxId = 0;
    let document;
    for (document in this.documentsList) {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documentsList.push(newDocument);
    let documentsListClone = this.documentsList.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === null || newDocument === null) {
      return;
    }

    let pos = this.documentsList.indexOf(originalDocument);
    if (pos < 0) {
      return;
    } 

    newDocument.id = originalDocument.id;
    this.documentsList[pos] = newDocument;
    let documentsListClone = this.documentsList.slice();
    let documentListChangedEvent.next(documentsListClone);
  }
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documentsList.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documentsList.splice(pos, 1);
    let documentsListClone = this.documentsList.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
}
