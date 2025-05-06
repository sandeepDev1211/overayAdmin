export class Product {
  name!: string;
  code!: string;
  price!: number;
  discount!: number;
  categories!: Array<string>;
  quantity!: number;
  weight!: number;
  keywords!: string;
  long_description!: string;
  description!: string;
  sku!: string;
  color!: string;
  size!: number;
  private constructor(public _id: string) {}
}
