import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { MaxValidator } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact>();

  contacts: Contact [] =[];
  maxContactId: Number;
  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  storeContacts() {
    this.http.put('https://ms-angular-project-default-rtdb.firebaseio.com/contacts.json', 
    JSON.stringify(this.contacts), 
    {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe(
      () => {
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    );
 }

  getContacts() {
    return this.http
    .get<Contact[]>(
            'https://ms-angular-project-default-rtdb.firebaseio.com/contacts.json'
         ).subscribe(
          // success method
          (contacts: Contact[] ) => {
             this.contacts = contacts;
             this.maxContactId = getMaxId();
             this.contacts.sort(function(a, b){return 1 - 0});
             this.contactListChangedEvent.next(this.contacts.slice());
          },
          // error method
          (error: any) => {
             console.log(error);
          });
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  } 

  getMaxId(): Number {
    let maxId = 0;
    let contact;
    for (contact in this.contacts) {
      let currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === null) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact === null || newContact === null) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    } 

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
}