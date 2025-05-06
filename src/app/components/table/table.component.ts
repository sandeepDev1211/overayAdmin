import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { data } from '../modal/data';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  dataList !: data[];
  dataSource: any;
  dispalyedColumn: string[] = ['id', 'email', 'first_name', 'last_name'];

  constructor(private service: MasterService) {
    this.service.getData().subscribe((res) => {
      this.dataList = res;
      this.dataSource = new MatTableDataSource<data>(this.dataList);
    });
  }
}
