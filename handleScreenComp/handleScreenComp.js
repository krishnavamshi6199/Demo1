import { LightningElement, api, track } from 'lwc';
import getIntialScreenInfo from '@salesforce/apex/HandleScreenController.fetchInitialData'
export default class HandleScreenComp extends LightningElement {

    @api screenNumber;
    @api ScreenfieldList = [];
    @api calloutNeeded = false;
    @api calloutName;
    @api handleScreenObject = {};
    @api handleFieldDataUpdate = [];
    @api showModal = false;

    firstDigit='';
    secondDigit='';
    thirdDigit='';
    fourthDigi='';
    fifthDigit='';
    sixthDigit='';

    connectedCallback(){
        const inputParam = {screenNumber: this.screenNumber};
        console.log('Input screen number'+this.screenNumber);
        getIntialScreenInfo({ requestString: JSON.stringify(inputParam) })
          .then(result => {
            const parsedResult = JSON.parse(result);
            console.log('parsedResult'+JSON.stringify(parsedResult));
            if(!parsedResult.hasError){
                if(parsedResult.screenInfos){
                    this.calloutNeeded = parsedResult.screenInfos.apiCalloutNeeded;
                    this.calloutName = parsedResult.screenInfos.apiName;
                }
                if(parsedResult.formFields){
                    this.ScreenfieldList = parsedResult.formFields;
                    this.handleScreenObject.fieldsTobeUpdated= parsedResult.formFields;
                    this.handleScreenObject.apiCalloutNeeded =  this.calloutNeeded;
                    this.handleScreenObject.apiName =  this.calloutName;
                    let i;
                            for (i = 0; i < parsedResult.formFields.length; i++) {
                                if(parsedResult.formFields[i].dataUpdateinSFs.length >0){
                                    this.handleFieldDataUpdate = [
                                        ...this.handleFieldDataUpdate,
                                        {
                                            value: parsedResult.formFields[i].dataUpdateinSFs,
                                            label: parsedResult.formFields[i].dataUpdateinSFs.fieldName
                                        }
                                    ];
                                }
                            }
                }

            }
          })
    }

    handleInputTaken(event) {
        let i;
                 for (i = 0; i < this.handleFieldDataUpdate.length; i++) {
                     if(this.handleFieldDataUpdate[i].value[0].fieldName === event.target.label){
                            this.handleFieldDataUpdate[i].value[0].value = event.target.value;
                    }
                }
        console.log('handleFieldDataUpdate Final List: '+JSON.stringify(this.handleFieldDataUpdate));
        this.handleScreenObject.fieldsSet= this.handleFieldDataUpdate;
        console.log('handleScreenObject Final List: '+JSON.stringify(this.handleScreenObject));
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
        if(finalOTP===this.dummyOTP) {
            const event = new ShowToastEvent({
                title: 'Success!',
                message: 'OTP Verified Successfully!',
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(event);
            this.editEmail();
        } else {
            const event = new ShowToastEvent({
                title: 'Error',
                message: 'Incorrect OTP! Please enter correct OTP and try again.',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(event);
        }
    }

    editEmail() {
        this.showModal      = false;
        this.firstDigit     = '';
        this.secondDigit    = '';
        this.thirdDigit     = '';
        this.fourthDigit    = '';
        this.fifthDigit     = '';
        this.sixthDigit     = '';
    }
}