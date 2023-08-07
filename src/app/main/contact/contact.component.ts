import { Component, OnInit } from '@angular/core';
import { UserContact } from 'src/app/core/models/user-contact';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public userContact: UserContact = new UserContact();
  public iconOk: boolean;
  public iconError: boolean;
  private _http: HttpClient;
  private _url: string = "https://api.telegram.org/bot910971390:AAFXCtSGcBPfhEbVISSf33t2e5MhPKXRqSw/sendMessage";
  private _chatId: string = "-331211245";

  constructor(http: HttpClient) {
    this._http = http
  }

  ngOnInit() {

  }

  public isValid(): boolean{
    return this.userContact.name == undefined || this.userContact.email == undefined   || this.userContact.text == undefined ;
  }

  public onSave() {
    let text: string = "Имя: " + this.userContact.name + "\r\nEmail: " + this.userContact.email + "\r\nСообщение: " + this.userContact.text;
    let body: any = {};
    body["chat_id"] = this._chatId;
    body["text"] = text;
    this._http.post(this._url, body).subscribe(result => {
      this.iconError = false;
      this.iconOk = true;
      this.userContact = new UserContact();
    }, error => {
      this.iconOk = false;
      this.iconError = true;
      this.userContact = new UserContact();
    });
  }
}
