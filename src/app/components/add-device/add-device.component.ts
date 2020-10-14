import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DeviceService } from 'src/app/services/device.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  @Input() idModal: string;
  @Input() gateway:string;
  @Output() answer: EventEmitter<boolean> = new EventEmitter<boolean>();

  public registerForm = this.fb.group({
    uid: ['', [Validators.required, Validators.pattern('[0-9]')]],
    vendor: ['', [Validators.required, Validators.minLength(2)]],
    date: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
    private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

  saveDevice() {
    const uid = this.registerForm.get('uid').value;
    const vendor = this.registerForm.get('vendor').value;
    const date = this.registerForm.get('date').value;
    const gateway = this.gateway;

    const resp = this.deviceService
      .createDevice({uid,vendor,date,gateway})
      .subscribe(
        (resp) => {
          Swal.fire('Success', 'Device added successfully', 'success');
          this.answer.emit(true);
          this.registerForm.setValue({
            uid: '',
            vendor: '',   
            date:''        
          });
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
