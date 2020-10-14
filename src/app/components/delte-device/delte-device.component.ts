import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-delte-device',
  templateUrl: './delte-device.component.html',
  styleUrls: ['./delte-device.component.css']
})
export class DelteDeviceComponent implements OnInit {

  @Input() idModal:string;
  @Input() idDevice:string;
  @Output() answer: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor( private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

  deleteDevice(){
    this.deviceService.deleteDevice(this.idDevice).subscribe((resp:any)=>{
      if(resp.ok){
        this.answer.emit(true);
      }
      else{
        this.answer.emit(false);
      }
    });
  }

}
