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

  @ViewChild('agGridForGroupedDataSet') agGridForGroupedDataSet: AgGridAngular;

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


  // lets grouping data
  defaultGroupingColDef = {
    sortable: true,
    filter: true
  };

  groupingColumnDefs = [
    { field: 'make', rowGroup: true },
    { field: 'price' }
  ];

  autoGroupColumnDef = {
    headerName: 'Model',
    field: 'model',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true
    }
  };

  groupingRowDatas: Observable<any[]>;

  ngOnInit(): void {
    this.fetchSmallDataSet();
    this.fetchLargeAmountDataSet();
  }

  fetchSmallDataSet(): void {
    this.rowDatas = this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-row-data.json');
  }

  fetchLargeAmountDataSet(): void {
    this.largeAmountRowDatas = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
    this.groupingRowDatas = this.largeAmountRowDatas;
  }

  getSelectedRows(): void {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  getSelectedRowsForLargeAmountOfData(): void {
    const selectedNodes = this.agGridForLargeDataSet.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  getSelectedGroupRowsForLargeAmountOfData(): void {
    const selectedNodes = this.agGridForGroupedDataSet.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => {
      if (node.groupData) {
        return { make: node.key, model: 'Group' };
      }
      return node.data;
    });
    const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
