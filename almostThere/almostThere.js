import { LightningElement,track,api} from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class InputText extends LightningElement 
{
     @track displayDiv = false;

    showDivHandler(event){
        this.displayDiv = event.target.checked;
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