import { LightningElement,track,api } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';
export default class LightningExampleAccordionBasic extends LightningElement {
@track mod=false;
@track verifying=false;
@track verifying2=false;
 pop()
 {
 this.mod=true;
 }
 closeModal()
 {
     this.mod=false;
     this.verifying=true;

     clearTimeout(this.timeoutId); // no-op if invalid id
        this.timeoutId = setTimeout(this.doExpensiveThing.bind(this), 2500); // Adjust as necessary
        this.timeoutId = setTimeout(this.handleNavigation.bind(this), 4000); 
    }
    doExpensiveThing() 
    { this.verifying = false;
        this.verifying2=true;

 }
  closemodal2(){
      this.verifying2=false;
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