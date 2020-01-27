import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendSingleEmail from '@salesforce/apex/EmailClass.sendSingleEmail';
import getSendToAddresses from '@salesforce/apex/EmailClass.getSendToAddress';
import writeSomeLabel from '@salesforce/label/c.writeSome';
import errorLabel from '@salesforce/label/c.error';
import successLabel from '@salesforce/label/c.error';
import successSentLabel from '@salesforce/label/c.sent';
import noSentLabel from '@salesforce/label/c.notsent';
import fillAllLabel from '@salesforce/label/c.fillAll';
import emailMissedLabel from '@salesforce/label/c.emailMissed';
import sendToLabel from '@salesforce/label/c.sendTo';
import subjectLabel from '@salesforce/label/c.subject';
import sendLabel from '@salesforce/label/c.send';

export default class EmailForm extends LightningElement {

@track validity = true;
@track errorMess = writeSomeLabel;  
@track sendToAddresses;    
@track emailMissed = emailMissedLabel;
message;
subject;
labelsForHTML = {
    sendToLabel,
    subjectLabel,
    sendLabel
}; 
    
@wire(getSendToAddresses) getData({data}) { 
    if(data) {
        if (Array.isArray(data)) {              
            this.sendToAddresses = data.map(e => e).join(', ');
        }         
    }        
}
        
validation() {        
    if (!this.template.querySelector('lightning-input-rich-text').value) {
        this.validity = false;
    }
    else {
        this.validity = true;
    }
}

handleClick() {
            
    const subject = this.template.querySelector('[data-id="subject"]');
    const message = this.template.querySelector('lightning-input-rich-text');
                    
    if(!message.value) {                      
        this.validity = false;
    }
    
    if(message.value) {     
        this.subject = subject.value;
        this.message = message.value;
            
        sendSingleEmail({subject: this.subject, body: this.message})
        .then(result => {
            if(result) {
                const event = new ShowToastEvent({
                    'title': successLabel,
                    'message': successSentLabel,
                    'variant': 'success'
                });
                this.dispatchEvent(event);                      
                subject.value = '';  
                message.value = '';  
                this.validity = true;
            } else {
                const event = new ShowToastEvent({
                    'title': errorLabel,
                    'message': noSentLabel,
                    'variant': 'error'
                });
                this.dispatchEvent(event);
            }
        }).catch(error => {              
            const event = new ShowToastEvent({
                'title': errorLabel,
                'message': error.body.message,
                'variant': 'error'
            });
            this.dispatchEvent(event);
        });                            
    } else {
        const event = new ShowToastEvent({
            'title': errorLabel,
            'message': fillAllLabel,
            'variant': 'error'
        });
        this.dispatchEvent(event);
    }           
}

}
