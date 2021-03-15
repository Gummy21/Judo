import { Component, OnInit,OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { JudoService } from '../services/judo.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,OnDestroy {
  private unsub: Subject<any> = new Subject();
  id:number = 1;
  move: object = {};

  constructor(private judoService:JudoService) { }



  ngOnInit() {
    this.judoService.getSingle(this.id).pipe(takeUntil(this.unsub)).subscribe(single =>{
      console.log(single)
      this.move = single
    })

  }

  
  ngOnDestroy(){
    this.unsub.next()
    this.unsub.complete()
    

  }

}
