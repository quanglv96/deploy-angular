import {Component, Input, OnInit} from '@angular/core';
import * as $ from "jquery";
import {OwlOptions} from "ngx-owl-carousel-o";
import {Router} from "@angular/router";

@Component({
  selector: 'app-discovery-item',
  templateUrl: './discovery-item.component.html',
  styleUrls: ['./discovery-item.component.css']
})
export class DiscoveryItemComponent implements OnInit{
  @Input() items: any[] = [];
  @Input() title: string = '';
  @Input() navClass: string = ''
  @Input() path:string=""

  customOptions: OwlOptions = {
    items: 5,
    slideBy: 5,
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 300,
    margin: 8
  }


  ngOnInit(): void {
  }
  constructor(private router:Router) {
  }
  prev(s: string) {
    $(s).trigger('click')
  }

  next(s: string) {
    $(s).trigger('click')
  }


  redirect(path: string, id: any) {
    return this.router.navigateByUrl(`${path}/${id}`)
  }

}
