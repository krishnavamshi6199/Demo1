import { LightningElement } from 'lwc';
import getOtp from '@salesforce/apex/OtpHandler.verify';

export default class ParentOtp extends LightningElement 
{
    OtpFromApex;
    afterClick=false;
    email;

    Phone;
    PhoneNumber(event)
    {
        this.Phone=event.target.value;
    }
    Email(event)
    {
        this.email=event.target.value;
    }
    openModal()
    {

this.afterClick=true;
getOtp({p:this.Phone}).then(response =>{
    this.OtpFromApex = response;
    console.log(OtpFromApex);
}).catch(error =>{
    console.error('Error ,method not started', error.body.message);
})


    }



}