import { Component, inject, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Brand } from '../../../types/brand';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Brand>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  brandService = inject(BrandService);
  
  constructor() {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit() {
    this.getServerData();
  }
  private getServerData() {
    this.brandService.getBrands().subscribe((brands) => {
      this.dataSource = new MatTableDataSource(brands);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.data = brands;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(id: string){
    console.log(id);
    this.brandService.deleteBrandById(id).subscribe((res:any) => {
      alert("Brand deleted successfully");
      this.getServerData();

    })
  }

}
