import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { GatewayService } from 'src/app/services/gateway.service';
import { Gateway } from 'src/app/models/gateway';

@Component({
  selector: 'app-edit-gateway',
  templateUrl: './edit-gateway.component.html',
  styles: [
  ]
})
export class EditGatewayComponent implements OnInit {

  
  @Input() idModal: string;
  @Input() gateway:Gateway = new Gateway();
  @Output() answer: EventEmitter<boolean> = new EventEmitter<boolean>();

  patternIPV4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    serial: ['', [Validators.required, Validators.minLength(6)]],
    ipv4: ['', [Validators.required, Validators.pattern(this.patternIPV4)]],
  });

  constructor(
    private fb: FormBuilder,
    private gatewayService: GatewayService
  ) {}

  ngOnInit(): void {   
    
  }

  updateGateway() {
    const name = this.registerForm.get('name').value;
    const serial = this.registerForm.get('serial').value;
    const ipv4 = this.registerForm.get('ipv4').value;

    const resp = this.gatewayService
      .updateGateway({ name, serial, ipv4 },this.gateway.id)
      .subscribe(
        (resp) => {
          Swal.fire('Success', 'Gateway updated successfully', 'success');
          this.answer.emit(true);         
        },
        (err) => {
          err.error.message ? Swal.fire('Error', err.error.message, 'error'):Swal.fire('Error',"Server Internal Error, possible server off", 'error');
        }
      );
  }

  invalidFields(field: string): boolean {
    return this.registerForm.get(field).invalid;
  }
}
