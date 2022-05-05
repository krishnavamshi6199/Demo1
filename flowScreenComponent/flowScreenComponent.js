import { LightningElement, api , track} from 'lwc';
import screenComponents from '@salesforce/apex/MainScreenWrapperDummy.screenComponents';
import sendingDataToApexFromLWC from '@salesforce/apex/MainScreenWrapperDummy.sendingDataToApexFromLWC';
import {FlowAttributeChangeEvent, FlowNavigationNextEvent} from 'lightning/flowSupport';

export default class FlowScreenComponent extends LightningElement {
    @api screenNumber;
    @api screenFlowObject;
    @api outputTest;
    @api fields;
    @api buttons;

    @track fieldListSize;
    @track buttonListSize;
    @api availableActions = [];
    @track showconsenttrue;

    @track screen1popup = this.screenNumber == 1? true : false;
    @track screen2popup;
    @track screen3popup;
    @track radioButtonChildRecords=false;
    @track valueFromRadioParent;
    @track comboBoxChildRecords=false;
    @track valueFromComboParent;
    @track radioChildFieldList;
    @track comboChildFieldList;
    @track mapOfChildFields;
    @track showCommonFooter = false;
    
    @track screen2header = this.screenNumber == 2? true : false;
    @track screen3header = this.screenNumber == 3? true : false;
    @track screen4header = this.screenNumber == 4? true : false;

    @track returnJSON = {};
    @api previousJSON;
    @api recievedJSON;
    @api previousSelectedCurrency;
    @api selectedCurrency;
    
    connectedCallback() {
        screenComponents({ screenNumber : this.screenNumber })
        .then(result => {
            this.screen1popup = this.screenNumber == 1? true : false;
            this.screen2header = this.screenNumber == 2? true : false;
            this.screen3header = this.screenNumber == 3? true : false;
            this.screen4header = this.screenNumber == 4? true : false;
            this.returnJSON = JSON.parse(this.recievedJSON);
            console.log('JSON from Apex : '+JSON.stringify(this.returnJSON) + ', previous Currency : '+this.previousSelectedCurrency+', currency = '+this.selectedCurrency);
            // this.selectedCurrency = this.previousSelectedCurrency;

            const parsedData = JSON.parse(result);
            this.screenFlowObject = JSON.parse(result);
            console.log('Parsed Data ',this.screenFlowObject);
            console.dir(this.screenFlowObject);
            this.mapOfChildFields = new Map(Object.entries(this.screenFlowObject.radioAndComboBoxDependentFields));
            this.fieldListSize = this.screenFlowObject.fieldList.length > 0? true: false ;
            this.buttonListSize = this.screenFlowObject.buttonList.length > 0? true: false ;
            
            this.fields = parsedData.fieldList;
            console.log('Fields : ',this.fields);
            this.buttons = parsedData.buttonList;
            console.log('Buttons : ',this.buttons);
            this.showCommonFooter = true;
            
        })
        .catch(error => {
            console.log('Error '+error);
        });

    }

    get showTopStaticScreen() {
        if(this.screenFlowObject!==undefined && this.screenFlowObject.isTopStaticScreen===true) {
            return true;
        }
        return false;
    }

    get showBottomStaticScreen() {
        if(this.screenFlowObject!==undefined && this.screenFlowObject.isBottomStaticScreen===true) {
            return true;
        }
        return false;
    }

    get showScreenModal() {
        if(this.screenFlowObject!==undefined && this.screenFlowObject.showModal===true && this.screenFlowObject.showModal===false) {
            return true;
        }
        return false;
    }

    handleTextInputChange(event) {
        this.returnJSON[event.target.label] = event.target.value;
        console.log('Testing json '+JSON.stringify(this.returnJSON));
    }

    handleComboxInputChange(event) {
        this.returnJSON[event.target.label] = event.target.value;
        // console.log('Testing json '+JSON.stringify(this.returnJSON));'[data-id="overview"]'
        // console.log('Testing key :'+ event.target.dataset.key);
        var identifier = "[data-id="+event.target.dataset.key+"]";
        // console.log('identifier : '+ identifier);
        const ourDiv2 = this.template.querySelector(identifier);
        // console.log('this is our div : '+ ourDiv2+' , '+ourDiv2.innerHTML);
        
        // console.log('verifying map key : '+event.target.dataset.label+', '+event.target.value); 
        var mapKey = event.target.dataset.label+ '_' + event.target.value;
        console.dir(this.mapOfChildFields.keys());
        if(this.mapOfChildFields.has(mapKey.trim())){
            ourDiv2.style.display = "block";
            ourDiv2.classList.add('slds-visible');
            ourDiv2.classList.remove('slds-hidden');
            console.log(this.mapOfChildFields.get(mapKey.trim()));
            this.comboChildFieldList = this.mapOfChildFields.get(mapKey.trim());
        }
        else{
            ourDiv2.style.display = "none";
        }
                
    }

    handleRadioGroupInputChange(event) {
        this.returnJSON[event.target.label] = event.target.value;
        console.log('Testing json '+JSON.stringify(this.returnJSON));
        // console.log('Testing json '+JSON.stringify(this.returnJSON));'[data-id="overview"]'
        console.log('Testing key :'+ event.target.dataset.key);
        var identifier = "[data-id="+event.target.dataset.key+"]";
        console.log('identifier : '+ identifier);
        const ourDiv2 = this.template.querySelector(identifier);
        console.log('this is our div : '+ ourDiv2+' , '+ourDiv2.innerHTML);
        var mapKey = event.target.dataset.label+ '_' + event.target.value;
        
        console.log('verifying map key : '+event.target.dataset.label+', '+event.target.value+' , '+this.mapOfChildFields.has(mapKey.trim())); 
        console.dir(this.mapOfChildFields.keys());
        if(this.mapOfChildFields.has(mapKey.trim())){
            ourDiv2.style.display = "block";
            ourDiv2.classList.add('slds-visible');
            ourDiv2.classList.remove('slds-hidden');
            console.log(this.mapOfChildFields.get(mapKey.trim()));
            this.radioChildFieldList = this.mapOfChildFields.get(mapKey.trim());
        }
        else{
            ourDiv2.style.display = "none";
        }
    } 

    handleButtonClick(event) {
        this.previousJSON = JSON.stringify(this.returnJSON);
        console.log('Event Name = ' + event.type, ' : Screen Number : '+this.screenNumber, ' , Condition : '+ (this.screenNumber == 2 && event.type == 'click'));
        if(this.screenNumber == 2 && event.type == 'click'){
            console.log('screen number is 2');
            this.screen2popup = true;
            this.showconsenttrue=true;
        }
        else if(event.type == 'nextverify'){
            console.log('Currency Selected : '+event.detail)
            this.previousSelectedCurrency = event.detail;
            console.log('assigned value : '+this.previousSelectedCurrency);
            const attributeChangeEvent = new FlowAttributeChangeEvent('screenNum',  this.screenNumber);
            this.dispatchEvent(attributeChangeEvent);
            if (this.availableActions.find((action) => action === 'NEXT')) {
                const nextNavigationEvent = new FlowNavigationNextEvent();
                this.dispatchEvent(nextNavigationEvent);
            } 
        }
        else if(this.screenNumber == 2 && event.type == 'agreednext'){
            console.log('screen number is 2, before verified');
            this.screen3popup = true;
        }
        else if(this.screenNumber == 2 && event.type == 'verified'){
            console.log('screen number is 2, verified');
            const attributeChangeEvent = new FlowAttributeChangeEvent('screenNum',  this.screenNumber);
            this.dispatchEvent(attributeChangeEvent);
            if (this.availableActions.find((action) => action === 'NEXT')) {
                const nextNavigationEvent = new FlowNavigationNextEvent();
                this.dispatchEvent(nextNavigationEvent);
            }
        }
        else{
            const attributeChangeEvent = new FlowAttributeChangeEvent('screenNum',  this.screenNumber);
            this.dispatchEvent(attributeChangeEvent);
            if (this.availableActions.find((action) => action === 'NEXT')) {
                const nextNavigationEvent = new FlowNavigationNextEvent();
                this.dispatchEvent(nextNavigationEvent);
            } 
        }
        
        if(this.screenNumber == 6 && event.target.label == 'Proceed'){
            sendingDataToApexFromLWC({jsonFromLWC : JSON.stringify(this.returnJSON)})
                .then(result => {
                    console.log('Data sent to Apex Successfully '+JSON.stringify(this.returnJSON));
                })
                .catch(error => {
                    console.log('Data sending to Apex failed : '+error);
                });
        }
    }

}