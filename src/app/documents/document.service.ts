import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { MaxValidator } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document>();
  documents: Document[] = [];
  
  documentsList: Document[] = [];
  maxDocumentId: Number;
  constructor(private http: HttpClient) {
    this.documentsList = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  storeDocuments() {
    this.http.put('https://ms-angular-project-default-rtdb.firebaseio.com/documents.json', 
    JSON.stringify(this.documents), 
    {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe(
      () => {
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
  }

  getDocuments() {
    return this.http
    .get<Document[]>(
            'https://ms-angular-project-default-rtdb.firebaseio.com/documents.json'
         ).subscribe(
          // success method
          (documents: Document[] ) => {
             this.documents = documents;
             this.maxDocumentId = getMaxId();
             this.documents.sort(function(a, b){return 1 - 0});
             this.documentListChangedEvent.next(this.documents.slice());
          },
          // error method
          (error: any) => {
             console.log(error);
          });
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
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
  }
}
