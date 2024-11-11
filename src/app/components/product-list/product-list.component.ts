import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {ProductListService} from '../../service/product-list.service';
import {Product} from '../../model/Product.model';
import {MatCardModule} from '@angular/material/card';
import {CurrencyPipe} from '@angular/common';
import {CartService} from '../../service/cart.service';
import {CartItem} from '../../model/CartItem.model';
import {OrderConfirmationComponent} from '../order-confirmation/order-confirmation.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CurrencyPipe, MatDialogModule, MatIconModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  totalQuantity: number = 0;

  constructor(private productService: ProductListService,
              private cartService: CartService,
              private dialog: MatDialog,
             ) {
  }

  ngOnInit(): void {
    try {
      this.products = this.productService.getProductList();
      console.log(`list of products: ${JSON.stringify(this.products)}`);
    } catch (e) {
      console.log(`Error while fetching products: ${e}`);
    }
  }

  getCartItems() {
    this.cartItems = this.cartService.cartItems;
    this.getUpdatedCartInfo();
  }

  addToCart(product: Product) {
    const cartItem: CartItem = {
      productId: product.id,
      productName: product.name,
      quantity: 1,
      image: product.image.thumbnail,
      price: product.price
    };
    this.cartService.addToCart(cartItem);
    this.getCartItems();
  }

  removeProductFromCart(product: Product) {
    this.cartService.removeProductFromCart(product);
    this.getCartItems();

  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem);
    this.getUpdatedCartInfo();
  }

  doesCartContainProduct(productId: number): boolean {
    return this.cartItems.some(cartItem => cartItem.productId === productId);
  }


  getUpdatedCartInfo() {
    this.cartService.cartTotal.subscribe(cartTotal => this.cartTotal = cartTotal);
    this.cartService.totalQuantity.subscribe(totalQuantity => this.totalQuantity = totalQuantity);
    console.log(`list of cart items: ${JSON.stringify(this.cartItems)}`);
    console.log(`cart total: ${JSON.stringify(this.cartTotal)}`);
    console.log(`total quantity: ${JSON.stringify(this.totalQuantity)}`);
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(OrderConfirmationComponent, {
      width: '450px',
      panelClass: 'order-confirmation-dialog',
      data: {
        cartItems: this.cartItems,
        cartTotal: this.cartTotal
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      window.location.reload();
    });
  }

  getTotalCartQuantity(productId:number){
    return this.cartItems.find(cartItem => cartItem.productId === productId)?.quantity;
  }
}
