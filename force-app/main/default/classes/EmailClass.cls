public class EmailClass {

    @AuraEnabled(cacheable=true)
    public static Boolean sendSingleEmail(String subject, String body) { 
        boolean state = false;       
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();      
        List<String> addresses = getSendToAddress();  
        email.setToAddresses(addresses);
        email.setSubject(subject);
        email.setHtmlBody(body);
        try {
            Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});   
            state = true;
            for(Messaging.SendEmailResult result : results) {
                if(!result.isSuccess()) {
                    state = false;
                    break;
                } 
            }       
            return state;
        } catch(Exception e) {
            return false;
        }        
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getSendToAddress() {        
        List<String> addresses = new List<String>();
        for(EmailServicesAddresses__c emailAddress : EmailServicesAddresses__c.getAll().values()) {            
            if(emailAddress.Email__c != null) {
                addresses.add(emailAddress.Email__c);
            }
        }    
        return addresses;     
    }

}