import {Injectable} from '@angular/core';
import {CartItem} from '../model/CartItem.model';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../model/Product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  cartTotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> =new BehaviorSubject<number>(0);

  addToCart(cartItem:CartItem){
    let existingCartItem: CartItem | undefined;
    if(this.cartItems.length>0){
      existingCartItem = this.cartItems.find(item => item.productId === cartItem.productId);
    }
    if(existingCartItem){
        existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(cartItem);
    }
    this.computeCartTotal();
  }

  removeCartItem(cartItem:CartItem){
    const itemIndex = this.cartItems.findIndex(item => item.productId === cartItem.productId);
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
    }
    this.computeCartTotal();
  }

  removeProductFromCart(product:Product){
    let cartItems = this.cartItems.filter(item => item.productId === product.id);
    if(cartItems !== undefined && cartItems.length > 0){
      cartItems[0].quantity--;
    }
    if(cartItems[0].quantity === 0){
      this.removeCartItem(cartItems[0]);
    }
    this.computeCartTotal();
  }

  computeCartTotal(){
    let total=0;
    let quantity=0;
    this.cartItems.forEach(item => {
      total += item.price * item.quantity;
      quantity+=item.quantity;
    });
    this.cartTotal.next(total);
    this.totalQuantity.next(quantity);
  }

  clearCart(){
    this.cartItems = [];
    this.computeCartTotal();
  }
}
