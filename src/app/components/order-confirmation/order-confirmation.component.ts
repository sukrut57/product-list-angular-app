import {Component, inject,} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {CartItem} from '../../model/CartItem.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss'
})
export class OrderConfirmationComponent {

  router = inject(Router);

  readonly dialogRef = inject(MatDialogRef<OrderConfirmationComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  readonly cartItems: CartItem[] = this.data.cartItems;
  readonly cartTotal: number = this.data.cartTotal;

}
