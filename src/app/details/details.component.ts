import { Component, OnInit,OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import { JudoService } from '../services/judo.service'


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,OnDestroy {
  private unsub: Subject<any> = new Subject();
  id:number = 1;
  move:any;
  video:any;
  safe:any;
  constructor(private judoService:JudoService, private dom: DomSanitizer) { }


  ngOnInit() {
    this.judoService.getSingle(this.id).pipe(takeUntil(this.unsub)).subscribe(single =>{
      console.log(single)
      this.move = single
      this.video = this.move[0].video 
      this.safe = this.dom.bypassSecurityTrustResourceUrl(this.video)
      console.log(this.safe)
      
    })

  }

  
  ngOnDestroy(){
    this.unsub.next()
    this.unsub.complete()
    

  }

}
