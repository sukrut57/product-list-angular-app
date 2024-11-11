import {Injectable} from '@angular/core';
import {Product} from '../model/Product.model';
import {productData} from '../model/Product.data';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  products : Product[] = productData;

  constructor() { }

  getProductList(){
    return productData;
  }
}
