import { Component, ViewChild, OnInit } from '@angular/core';
import { CSVRecord } from './CSVRecord';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'parse-csv',
  templateUrl: './parse-csv.component.html',
  styleUrls: ['./parse-csv.component.css']
})
export class ParseCsvComponent implements OnInit{
  public records: any[] = [];   
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  @ViewChild('csvReader') csvReader: any;

  dataSource = new MatTableDataSource<CSVRecord>(this.records);
  displayedColumns: string[]=["id", "firstName", "lastName", "age", "position", "mobile"];
  
  ngOnInit() {
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
  uploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
        //console.log("Value of record var before calling getDataRecords methd " + this.records);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        //console.log("Value of record var after calling getDataRecords methd " + this.records.length);
        this.dataSource.data = this.records;
        //console.log("Value of datasource after calling getDataRecords methd " + this.dataSource.data);
          
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }  
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord();  
        csvRecord.id = curruntRecord[0].trim();  
        csvRecord.firstName = curruntRecord[1].trim();  
        csvRecord.lastName = curruntRecord[2].trim();  
        csvRecord.age = curruntRecord[3].trim();  
        csvRecord.position = curruntRecord[4].trim();  
        csvRecord.mobile = curruntRecord[5].trim();  
        csvArr.push(csvRecord);  
        
      }  
    }  
    return csvArr;  
  }  
  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  } 
  
}
