import { LightningElement,track,api } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';
export default class LightningExampleAccordionBasic extends LightningElement
 {
@track mod=false;
 pop()
 {
 this.mod=true;
 }
 @api
    availableActions = [];

    handleNavigation() 
    {    
        /** Navigating to next screen */
        if (this.availableActions.find(action => action === 'NEXT')) {
            const navigateNextEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigateNextEvent);
        }
    }
 }