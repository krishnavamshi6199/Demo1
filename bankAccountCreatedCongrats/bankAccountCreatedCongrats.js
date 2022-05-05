import { LightningElement,api } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class BankAccountCreatedCongrats extends LightningElement 
{

    @api
    availableActions = [];
    handleNavigation() 
    {    
        this.verifying2=false;
        /** Navigating to next screen */
        if (this.availableActions.find(action => action === 'NEXT')) {
            const navigateNextEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigateNextEvent);
        }
    }
}