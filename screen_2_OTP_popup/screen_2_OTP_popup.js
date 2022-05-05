import { LightningElement,api} from 'lwc';


export default class Screen_2_OTP_popup extends LightningElement {

   @api otpFromApi;
    @api displayModal=false;
    @api defaultOtp='123456';
    @api OtpRecievedOnPhone;
    @api OtpRecievedOnEmail;
    @api showError=false;
    onlyCloseModal()
    {
        this.displayModal=false;
    }
    
    openModal(event)
    {
        this.displayModal=true;
    }
    
    
    phoneAndMailOtpVerification(event)
    {
        const inputBoxName = event.target.name;
    
         if(inputBoxName === 'phone'){

             this.OtpRecievedOnPhone=event.target.value;
            
    
            } 
            else if(inputBoxName === 'email'){
                this.OtpRecievedOnEmail = event.target.value;
            }
    
     
     
    
    }
    
    verifyAction()
    {


        const sendToParent = new CustomEvent("getphonevalue",
        {
            detail:this.OtpRecievedOnPhone
        }
        );
    this.dispatchEvent(sendToParent);
    

     
    }
    onlyClose()
    {
        this.v=false;
    }
    
    }