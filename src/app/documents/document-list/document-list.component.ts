import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, 'name', 'description', 'url', null),
    new Document(2, 'Michael', 'Greetings!', 'url', null),
    new Document(3, 'Doug', 'Hello there', 'url', null),
    new Document(4, 'Steven', 'Hi!', 'url', null),
    new Document(5, 'Arthur', 'Howdy', 'url', null)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}