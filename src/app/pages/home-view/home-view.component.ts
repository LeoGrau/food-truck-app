import { Component, OnInit } from '@angular/core';
import { size } from 'lodash';
import { FoodTruck } from 'src/app/models/food-truck';
import { FoodTruckService } from 'src/app/services/food-truck.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  quantityFoodTrucks: number = 0;
  foodTrucks: Array<FoodTruck> = []
  constructor(private foodTruckService: FoodTruckService) { }

  ngOnInit(): void {
    this.getOffers()
    this.getQuantity()
  }


  getQuantity() {
    this.foodTruckService.getAll().subscribe((response: any) => {
      this.quantityFoodTrucks =  size(response);
    })
  }

  getOffers() {
    this.foodTruckService.getAll().subscribe((response: any) => {
      this.foodTrucks =  response;
    })
  }
}
