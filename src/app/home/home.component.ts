// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/data-service.service';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  searchQuery: string = '';
  cartItems: any[] = [];

  constructor(private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataService.fetchItems().subscribe(data => {
      this.items = data;
      this.filteredItems = data;
      console.log("tems" , this.items)
    });

    this.dataService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  search() {
    this.filteredItems = this.items.filter(item =>
      item.Year.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addToCart(item: any) {
    this.dataService.addToCart(item);
    alert("Added Successfully" )
  }

  openCartDialog(): void {
    this.dialog.open(CartComponent, {
      width: '300px',
      data: this.cartItems,
      disableClose: true
    });
  }
}
