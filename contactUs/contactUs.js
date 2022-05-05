import { LightningElement, track ,api} from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class ContactUs extends LightningElement {
    @track verifying=false;
    @track showModal= false; 
    closeModal()
    { 
        this.showModal= true;}
    @track email;
    emailHandler(event)
    {
        this.email=event.detail.value;
    } 
    closeModal2()
    {
        this.showModal= false;
        this.verifying=true;
    }
       pattern = '.{1,}';
       closeModal3(event) {

        this.verifying=true;

        clearTimeout(this.timeoutId); // no-op if invalid id
        this.timeoutId = setTimeout(this.handleNavigation.bind(this), 2500); 
    }

       @api
       availableActions = [];
       handleNavigation() 

       {    
       /** Navigating to next screen */
           if (this.availableActions.find(action => action === 'NEXT')) {
               const navigateNextEvent = new FlowNavigationNextEvent();
               this.dispatchEvent(navigateNextEvent);
           }}
    
       



}