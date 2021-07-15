import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { JudoService } from '../services/judo.service'
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadein', 
      [
        transition(':enter', [
            style({opacity: 0 }),
            animate('0.7s ease-out', 
              style({opacity: 1 }))
          ])
      ])]
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
    
  }

  constructor(private judoService:JudoService) { }

  ngOnInit(){
   
    this.judoService.getMoves(this.category,this.name).pipe(takeUntil(this.unsub)).subscribe(moves =>{
      
      this.judo = moves
    })
  }

  filter(){
    this.judoService.getMoves(this.category,this.name).pipe(takeUntil(this.unsub)).subscribe(moves =>{
      
      this.judo = moves
    });
  }

  ngOnDestroy(){
    this.unsub.next()
    this.unsub.complete()
  }

}
