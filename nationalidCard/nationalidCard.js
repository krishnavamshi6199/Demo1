import { LightningElement,track,api } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class NationalidCard extends LightningElement {
     //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
    @track isModalOpen = false;
    @track verifying=false;
    @track showfirsttemplate=false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
   
    }
    @track showimage =false; imageshow(){this.showimage=true;
    this.isModalOpen=false;
    this.showfirsttemplate=true;
    }
    @track verifying =false; openModal2(){this.verifying=true;
    } 
@api

    availableActions = [];
timeoutId;
openModal2(){

this.verifying=true;
clearTimeout(this.timeoutId); // no-op if invalid id

        
        this.timeoutId = setTimeout(this.handleNavigation.bind(this), 2000);

    }

    
    handleNavigation()

    {    

        /** Navigating to next screen */

        if (this.availableActions.find(action => action === 'NEXT')) {

            const navigateNextEvent = new FlowNavigationNextEvent();

            this.dispatchEvent(navigateNextEvent);

        }

    }
}