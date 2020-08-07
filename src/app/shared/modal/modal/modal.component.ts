import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from '../modal.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit,OnDestroy {
  @Input() id: string;
  private element: any;
  private visible: boolean;
  constructor(private modalSerivce: ModalService, private e1: ElementRef) { 
    this.element = e1.nativeElement;
    this.visible = false;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error("modal must have an id");
      return;
    }

    //moving element to bottom of body so it can displayed above everything else
    document.body.appendChild(this.element);

    //close modal on backoground click
    this.element.addEventListener('click', e1 => {
      console.log("click event", e1);
      if (e1.target.className === 'modal') {
        this.close();
      }
    })

    //add self to service so its accessible forom controllers
    this.modalSerivce.add(this);
    console.log("created modal", this.id);

  }

  ngOnDestroy(): void {
    this.modalSerivce.remove(this.id);
    this.element.remove();
  }

  open(): void {
    //this.element.style.display = 'block';
    //document.body.classList.add('modal-open');
    this.visible = true;
    console.log("opened modal");
  }

  close(): void {
    this.visible = false;
    //this.element.style.display = 'none';
    //document.body.classList.remove('modal-open');
    console.log("close mdoal");
  }

}
