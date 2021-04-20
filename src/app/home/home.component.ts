import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { JudoService } from '../services/judo.service'

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})




export class HomeComponent implements OnInit, OnDestroy {
  private unsub: Subject<any> = new Subject();
  category:number = 0;
  name:string = '';
  judo:any;
  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 450;
    console.log(this.isSticky)
  }

  constructor(private judoService:JudoService) { }

  ngOnInit(){
   
    this.judoService.getMoves(this.category,this.name).pipe(takeUntil(this.unsub)).subscribe(moves =>{
      console.log(moves)
      this.judo = moves
    })
  }

  filter(){
    this.judoService.getMoves(this.category,this.name).pipe(takeUntil(this.unsub)).subscribe(moves =>{
      console.log(moves)
      this.judo = moves
    });
  }

  ngOnDestroy(){
    this.unsub.next()
    this.unsub.complete()
  }

}
