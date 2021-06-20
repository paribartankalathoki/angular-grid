import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  @ViewChild('agGridForLargeDataSet') agGridForLargeDataSet: AgGridAngular;

  constructor(private http: HttpClient) { }

  columnDefs = [
    { field: 'name', sortable: true, filter: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true }
  ];

  rowData = [
    { name: 'Toyota', model: 'Celica', price: 35000 },
    { name: 'Ford', model: 'Mondeo', price: 32000 },
    { name: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  // if you wants to display real data i.e. working with server you can do on following way
  columnDefinations = [
    { field: 'make', sortable: true, filter: true, checkboxSelection: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true }
  ];
  rowDatas: Observable<any[]>;

  // to filtering and sorting, grouping is another effective way for the user to make sense out of large amounts of data.
  largeAmountRowDatas: Observable<any[]>;

  ngOnInit(): void {
    this.fetchSmallDataSet();
    this.fetchLargeAmountDataSet();
  }

  fetchSmallDataSet() {
    this.rowDatas = this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-row-data.json');
  }

  fetchLargeAmountDataSet() {
    this.largeAmountRowDatas = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }

  getSelectedRows(): void {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  getSelectedRowsForLargeAmountOfData() {
    const selectedNodes = this.agGridForLargeDataSet.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
