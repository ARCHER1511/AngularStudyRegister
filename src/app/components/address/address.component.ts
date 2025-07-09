  import {NgFor, NgIf} from '@angular/common';
  import { Component } from '@angular/core';
  import { FormArray, ReactiveFormsModule } from '@angular/forms';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';

  @Component({
    selector: 'app-address',
    standalone: true,
    imports: [NgIf,NgFor,ReactiveFormsModule],
    templateUrl: './address.component.html',
    styleUrl: './address.component.css'
  })
  export class AddressComponent {
    form: FormGroup
    // cards: Array<{
    //   title: string;
    //   description: string
    // }> = [];

    maxCards = 5;

    constructor(private fb: FormBuilder) {
      this.form = this.fb.group(
        {
          address:this.fb.array([])
        });
        this.addAddress();
    }

    get address():FormArray
    {
      return this.form.get('address') as FormArray
    }

    addAddress():void{
      if(this.address.length < 5)
        {
          const addressGroup = this.fb.group(
            {
              street:['',Validators.required],
              number:['',Validators.required],
              mark:['']
            });
            this.address.push(addressGroup);
        }
    }
    removeAddress(index:number):void
    {
      this.address.removeAt(index)
    }

    isFull():boolean
    {
      return this.address.length >= 5;
    }

    
  }

