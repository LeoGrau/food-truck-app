import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NgForm } from '@angular/forms';
import { MatSort } from "@angular/material/sort"
import { MatTableDataSource } from "@angular/material/table"
import { FoodTruck } from 'src/app/models/food-truck';
import { FoodTruckService } from 'src/app/services/food-truck.service';
import { Router } from '@angular/router';
import * as _ from "lodash"

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent implements OnInit, AfterViewInit {

  foodTruckData!: FoodTruck;
  dataSource = new MatTableDataSource();
  editMode = false;
  isFiltering = false;

  displayedColumns: string[] = ["id","ownerFirstName", "ownerLastName", "brandName", "email", "address", "actions"];

  @ViewChild("foodTruckForm", { static: false }) foodTruckForm!: NgForm;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private foodTruckService: FoodTruckService) {
    this.foodTruckData = {} as FoodTruck
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Del hijo le estamos pasando al padre
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllFoodTrucks()
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }

  getAllFoodTrucks(): void {
    this.foodTruckService.getAll().subscribe((response: any) => { this.dataSource.data = response })
  }

  editItem(element: any): void {
    console.log(element);
    this.foodTruckData = _.cloneDeep(element);
    this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
    this.foodTruckForm.resetForm();
  }

  deleteFoodTruck(id: number): void {
    this.foodTruckService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((item: any) => item.id != id)
    });
    console.log(this.dataSource.data)
  }

  addFoodTruck(): void {
    const newFoodTruck = {
      ownerFirstName: this.foodTruckData.ownerFirstName,
      ownerLastName: this.foodTruckData.ownerLastName,
      brandName: this.foodTruckData.brandName,
      email: this.foodTruckData.email,
      address: this.foodTruckData.address
    }
    this.foodTruckService.create(newFoodTruck).subscribe((newItem: any) => {
      this.dataSource.data.push({...newItem})
      this.dataSource.data = this.dataSource.data.map((item)=>item)
    });
  }

  updateFoodTruck() {
    this.foodTruckService.update(this.foodTruckData.id, this.foodTruckData).subscribe((toUpdatedItem: any) => {
      this.dataSource.data = this.dataSource.data.map((item: any) => {
        if (item.id == toUpdatedItem.id)
          item = toUpdatedItem
        return item;
      })
    });
    this.cancelEdit();
  }

  onSubmit() {
    if(this.foodTruckForm.form.valid) {
      if(this.editMode) {
        this.updateFoodTruck();
      }
      else {
        this.addFoodTruck()
      }
    }else {
      console.log("Invalid data!")
    }
  }


}
