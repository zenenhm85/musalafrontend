export class Device {
    constructor(   
      public id?: string,
      public uid?:number,
      public vendor?: string,
      public status?: boolean,
      public date?: Date,    
      public gateway?:string
    ) {}
  
  }
  