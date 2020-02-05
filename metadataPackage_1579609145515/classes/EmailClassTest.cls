@isTest
private class EmailClassTest {
    @isTest static void sendSingleEmailPositiveTest() {
        List<EmailServicesAddresses__c> emailAddresses = new List<EmailServicesAddresses__c>();
        EmailServicesAddresses__c emailAddress1 = new EmailServicesAddresses__c(
            Name='1',Email__c='via.shcherba@gmail.com'
        );
        emailAddresses.add(emailAddress1);
         EmailServicesAddresses__c emailAddress2 = new EmailServicesAddresses__c(
            Name='2',Email__c='viacheslav.shcherba@vrpconsulting.com'
        );
        emailAddresses.add(emailAddress2);
        insert emailAddresses;
        Test.startTest();
        Boolean result = EmailClass.sendSingleEmail('subject','body');       
        Test.stopTest();       
        System.assertEquals(true, result);
    }

    @isTest static void sendSingleEmailNegativeTest() {
        List<EmailServicesAddresses__c> emailAddresses = new List<EmailServicesAddresses__c>();
        EmailServicesAddresses__c emailAddress1 = new EmailServicesAddresses__c(
            Name='1',Email__c='via.shcherba@gmail.com'
        );
        emailAddresses.add(emailAddress1);
         EmailServicesAddresses__c emailAddress2 = new EmailServicesAddresses__c(
            Name='2',Email__c='gfdgerga'
        );
        emailAddresses.add(emailAddress2);       
         EmailServicesAddresses__c emailAddress3 = new EmailServicesAddresses__c(
            Name='3',Email__c='test@gmail.com'
        );
        emailAddresses.add(emailAddress3);
        insert emailAddresses;
        Test.startTest();
        Boolean result = EmailClass.sendSingleEmail('subject','body');       
        Test.stopTest();       
        System.assertEquals(false, result);
    }

}