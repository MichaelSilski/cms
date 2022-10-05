import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Document;
  @Output() selectedDocument = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument() {
    this.selectedDocument.emit();
  }
}