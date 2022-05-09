import { LightningElement ,api,track} from 'lwc';
import getOtp from '@salesforce/apex/OtpHandler.verify';

export default class Screen_2_otp_Input extends LightningElement 
{  @track OtprecievedFromChild;
    emailId;
    @track OtpFromApex;
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
getOtp({p:this.Phone,emailId:this.email}).then(response =>{
    this.OtpFromApex = response;
    console.log(OtpFromApex);
}).catch(error =>{
    console.error('Error ,method not started', error.body.message);
})



    }
    OtprecievedFromChild1;
    verifying=false;
    showError=false;
 EmailOtp;
    OtpFromChild(event)
    {
        
        this.OtprecievedFromChild=event.detail;
        if(this.OtprecievedFromChild==this.OtpFromApex||this.EmailOtp==this.OtpFromApex)
        {
            this.afterClick=false;
            this.verifying=true;
        }
        else if(this.OtprecievedFromChild!=this.OtpFromApex||this.OtpFromApex!=this.EmailOtp)
        {
            this.showError=true;

        }
    }
    EmailOtpFromChild(event)

    {
        this.EmailOtp=event.detail;
        
    }

    

    
}