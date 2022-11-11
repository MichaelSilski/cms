import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { MaxValidator } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  private messages: Message[] = [];
  maxMessageId: Number;
  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  storeMessages() {
    this.http.put('https://ms-angular-project-default-rtdb.firebaseio.com/messages.json', 
    JSON.stringify(this.messages), 
    {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe(
      () => {
        this.messageChangedEvent.next(this.messages.slice());
      }
    );
  }

  getMessages() {
    return this.http
    .get<Message[]>(
            'https://ms-angular-project-default-rtdb.firebaseio.com/messages.json'
         ).subscribe(
          // success method
          (messages: Message[] ) => {
             this.messages = messages;
             this.maxMessageId = getMaxId();
             this.messages.sort(function(a, b){return 1 - 0});
             this.messageChangedEvent.next(this.messages.slice());
          },
          // error method
          (error: any) => {
             console.log(error);
          });
  }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  } 

  getMaxId(): Number {
    let maxId = 0;
    let document;
    for (document in this.messages) {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
