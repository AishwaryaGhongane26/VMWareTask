import { LightningElement,api, wire } from 'lwc';
import getPublishingHouse from '@salesforce/apex/NumOfBooksByAuthor.getNumOfBooks';
const Columns = [
    //{label: 'Author First Name', fieldName: 'Author__c_First_Name__c'},
    //{label: 'Author Last Name', fieldName: 'Author__c_Last_Name__c'},
    {label: 'Author Name', fieldName: 'Author__c_Author_Name__c'},
    {label: 'Number Of Books Published', fieldName: 'Author__c_Number_of_Books_Published__c'},  
   
    ]// colum for datatable
    //why wirev decorator?  wire is recative in nature  when ever their is change in org data it will automaticaaly reflect in lwc .
export default class Related_Author extends LightningElement {
   @api recordId;   // give reacordid of account
   publishHouse;
    error;
    cols=Columns; //if the Apex method takes a string parameter, don’t pass a string directly. Instead, pass an object that contains a property whose value is a string.
   @wire(getPublishingHouse,{val: '$recordId'})wiredAuthor({ error, data }) {
    if (data) {
        this.publishHouse = data;
        this.error = undefined;
        // to show account name
        let currentData = [];
        data.forEach((row)=> { let rowData = {};
//rowData.Author__c_First_Name__c = row.Author__r.First_Name__c;
//rowData.Author__c_Last_Name__c = row.Author__r.Last_Name__c;
rowData.Author__c_Author_Name__c = row.Author__r.Author_Name__c;
rowData.Author__c_Number_of_Books_Published__c = row.Author__r.Number_of_Books_Published__c;

// if (row.Author__c_First_Name__c) {
//     rowData.Author__c_Number_of_Books_Published__c = row.Author__r.Number_of_Books_Published__c;
// }
currentData.push(rowData);

});
this.publishHouse = currentData;
       
        //
    } else if (error) {
        this.error = error;
        this.publishHouse = undefined;
    }
    console.log(data);
    console.log(error);
}

}
