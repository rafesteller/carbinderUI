import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: any[] = [];

  add(modal: any) {
    console.log("added modal", modal);
    this.modals.push(modal);
  }

  remove(id: string) {
    console.log("removed modal", id);
    this.modals = this.modals.filter( x => x.id !== id);
  }

  open(id: string) {
    console.log("open modal", id);
    let modal = this.modals.find(x => x.id === id);
    modal.open();
  }

  close(id: string) {
    console.log("close modal", id);
    let modal = this.modals.find(x => x.id === id);
    modal.close();
  }

  constructor() { }
}
