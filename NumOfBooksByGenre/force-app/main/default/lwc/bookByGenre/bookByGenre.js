import { LightningElement,api, wire } from 'lwc';
import getBookByGenre from '@salesforce/apex/PublishHouseRecordPage.BookGenre';
const Columns = [
    {label: 'Number of Books', fieldName: 'NumOfBooks'},  
    {label: 'Genre', fieldName: 'bookByGenre'}
   
    ]// colum for datatable
export default class Books_by_genre extends LightningElement {
   @api recordId;   // give reacordid of account
   bookgenre;
    error;
    cols=Columns; 
   @wire(getBookByGenre,{val: '$recordId'})wiredBooks({ error, data }) {
    if (data) {
        this.bookgenre = data;
        this.error = undefined;
        let currentData = [];
        data.forEach((row)=> { let rowData = {};
rowData.BookCount = row.NumOfBooks;
rowData.genre__c = row.bookByGenre;
if (row.genre__c) {
    rowData.BookCount = row.NumOfBooks;
}
currentData.push(rowData);

});
this.bookgenre = currentData;
       
    } else if (error) {
        this.error = error;
        this.bookgenre = undefined;
    }
    console.log(data);
    console.log(error);
}

}