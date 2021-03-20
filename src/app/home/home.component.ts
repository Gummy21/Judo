import { Component, OnInit, OnDestroy } from '@angular/core';
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


  constructor(private judoService:JudoService) { }

  ngOnInit(){
    this.judoService.getMoves(this.category,this.name).pipe(takeUntil(this.unsub)).subscribe(moves =>{
      console.log(moves)
      this.judo = moves
    })
  }

  

  ngOnDestroy(){
    this.unsub.next()
    this.unsub.complete()
  }

}
