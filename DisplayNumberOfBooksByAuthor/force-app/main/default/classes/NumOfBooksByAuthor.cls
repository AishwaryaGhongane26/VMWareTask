public with sharing class NumOfBooksByAuthor {
    @AuraEnabled(cacheable=true)
    public static List<Publishing_House__c> getNumOfBooks(Id val) {
    Integer NumOfBooks;
        return [SELECT Id, Author__r.First_Name__c, Author__r.Last_Name__c, Author__r.Author_Name__c, Author__r.Number_of_Books_Published__c 
                FROM Publishing_House__c where id=:val limit 1];
    }

    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getBookByGenre(Id val){
        Integer NumOfBooks;
    	List<AggregateResult> ar = [SELECT Count(Id) NumOfBooks, genre__c bookByGenre
                                    FROM Book__c where Publishing_House__c=:val GROUP BY genre__c ];
    	//NumOfBooks = integer.valueof(ar.get('NumOfBooks'))
    return ar;   
    }
}
