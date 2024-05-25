// src/app/cart/cart.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/data-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private dataService: DataService
  ) {
    this.cartItems = data;
  }

  removeFromCart(item: any) {
    this.dataService.removeFromCart(item);
    this.cartItems = this.cartItems.filter(i => i !== item);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
