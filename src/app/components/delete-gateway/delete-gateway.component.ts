import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { GatewayService } from '../../services/gateway.service';

@Component({
  selector: 'app-delete-gateway',
  templateUrl: './delete-gateway.component.html',
  styleUrls: ['./delete-gateway.component.css']
})
export class DeleteGatewayComponent implements OnInit {

  @Input() idModal:string;
  @Input() idGateway:string;
  @Output() answer: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor( private gatewayService: GatewayService) { }

  ngOnInit(): void {
    
  }
  deleteGateway(){
    this.gatewayService.deleteGateway(this.idGateway).subscribe((resp:any)=>{
      if(resp.ok){
        this.answer.emit(true);
      }
      else{
        this.answer.emit(false);
      }
    });
  }
}
