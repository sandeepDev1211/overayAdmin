export class Product {
    name!: string;
    code!: string;
    price!:number;
    discount!:number;
    categories!:Array<string>;

    private constructor(public _id:string){}
   
  }