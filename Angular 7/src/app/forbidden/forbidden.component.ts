import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styles: []
})
export class ForbiddenComponent implements OnInit {

  constructor(private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background-image',  'url(/assets/img/403.png)' );
   }

  ngOnInit() {
  }

}
