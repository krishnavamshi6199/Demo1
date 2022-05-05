import { LightningElement } from 'lwc';	
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import generateOTP from "@salesforce/apex/OTPService.generateOTP";
import validateOTP from "@salesforce/apex/OTPService.validateOTP";
import { phoneMask } from 'c/inputMaskUtils';

export default class GenerateOTP extends LightningElement {
    phoneNum;
    maskPhone;
    showModal=false;
    firstDigit='';
    secondDigit='';
    thirdDigit='';
    fourthDigi='';
    fifthDigit='';
    sixthDigit='';

    dummyOTP='123456';

    handleNumChange(event) {
        this.phoneNum = event.target.value;
        this.maskPhone = phoneMask(event.target.value);
        //let number = event.target.value;
        //this.maskPhone =  '('+number.substring(0,3)+')' + '••• •••'+ number.substring(7,9);
    }

    handleSubmit() {
        //validate phone number
        let isValid = true;
        let inputFields = this.template.querySelectorAll('lightning-input');
        inputFields.forEach(inputField => {
            console.log(' inputField.value : ',inputField.value);
            if(!inputField.checkValidity() || inputField.value===undefined || inputField.value===null || inputField.value==='') {
                inputField.reportValidity();
                isValid = false;
            }
        });
        console.log('isValid => ',isValid);
        if(isValid===true) {
            console.log('Entered Phone Number is valid');
            this.showModal = true;
            generateOTP({phone : this.phoneNum})
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    // TODO Error handling
                });
        } else {
            console.log('Entered Phone Number is not valid');
        }
    }

    handleOTPInput(event) {
        console.log(event.target.value);
        console.log(event.currentTarget.dataset.id);
        let currentTargetId = event.currentTarget.dataset.id;
        switch (currentTargetId) {
            case 'firstDigit'   :
                this.firstDigit = event.target.value;
                if(this.firstDigit!=='') {
                    const secondOTPElement = this.template.querySelector('[data-id="secondDigit"]');
                    if(secondOTPElement!==null) {
                        secondOTPElement.focus();
                    }
                }
                break;
            case 'secondDigit'  :
                this.secondDigit = event.target.value;
                if(this.secondDigit!=='') {
                    const thirdOTPElement = this.template.querySelector('[data-id="thirdDigit"]');
                    if(thirdOTPElement!==null) {
                        thirdOTPElement.focus();
                    }
                }
                break;    
            case 'thirdDigit'   :
                this.thirdDigit = event.target.value;
                if(this.thirdDigit!=='') {
                    const fourthOTPElement = this.template.querySelector('[data-id="fourthDigit"]');
                    if(fourthOTPElement!==null) {
                        fourthOTPElement.focus();
                    }
                }
                break;
            case 'fourthDigit'  :
                this.fourthDigit = event.target.value;
                if(this.fourthDigit!=='') {
                    const fifthOTPElement = this.template.querySelector('[data-id="fifthDigit"]');
                    if(fifthOTPElement!==null) {
                        fifthOTPElement.focus();
                    }
                }
                break;
            case 'fifthDigit'   :
                this.fifthDigit = event.target.value;
                if(this.fifthDigit!=='') {
                    const sixthOTPElement = this.template.querySelector('[data-id="sixthDigit"]');
                    if(sixthOTPElement!==null) {
                        sixthOTPElement.focus();
                    }
                }
                break;
            case 'sixthDigit'   :
                this.sixthDigit = event.target.value;
                break;
        }
    }

    verifyOTP() {
        let finalOTP = this.firstDigit + this.secondDigit + this.thirdDigit + this.fourthDigit + this.fifthDigit + this.sixthDigit;
        console.log(finalOTP);
        validateOTP({otp : finalOTP, phone : this.phoneNum})
            .then(result => {
                console.log('I am result : '+result);
                if(result){
                    console.log('I am inside if result ');
                    const event = new ShowToastEvent({
                    title: 'Success!',
                    message: 'OTP Verified Successfully!',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(event);
                this.editPhone();
                }
                else{
                    console.log('I am inside else result ');
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Incorrect OTP! Please enter correct OTP and try again.',
                        variant: 'error',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(event);
               }
            })
            .catch(error => {
                console.log('I am inside error result ');
                const event = new ShowToastEvent({
                    title: 'Error',
                    message: 'Incorrect OTP! Please enter correct OTP and try again.',
                    variant: 'error',
                    mode: 'dismissable'
                });
                this.dispatchEvent(event);
            });
    }

    editPhone() {
        this.showModal      = false;
        this.firstDigit     = '';
        this.secondDigit    = '';
        this.thirdDigit     = '';
        this.fourthDigit    = '';
        this.fifthDigit     = '';
        this.sixthDigit     = '';
    }
}