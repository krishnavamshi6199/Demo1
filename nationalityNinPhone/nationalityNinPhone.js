import { LightningElement ,track,api} from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class NationalityNinPhone extends LightningElement
 {
    @track displayDiv = false;

    showDivHandler(event){
        this.displayDiv = event.target.checked;
    }

   Nin;
   @track Phone;
    Nationality='Uganda';

    get options() {
        return [
            { label: 'Uganda', value: 'Uganda' },

            { label: 'USA', value: 'USA' },

            { label: 'South Africa', value: 'South Africa' },
        ];
    }
    handleChange(event) {
        this.Nationality = event.detail.value;
    }
    NinValue(event)
    {this.Nin=event.detail.value
    }
    PhoneNumber(event)
    {
        this.Phone=event.detail.value;
    }

    @track showModal = false;
 
    openModal() {
        // Setting boolean variable to true, this will show the Modal
        this.showModal = true;
    }
  @track verifying=false;
  onlyCloseModal()
  {
    this.showModal = false;
  }
  @track verifying2;
    closeModal(event) {

        this.showModal = false;
        this.verifying = true;

        clearTimeout(this.timeoutId); // no-op if invalid id
        this.timeoutId = setTimeout(this.doExpensiveThing.bind(this), 2500); // Adjust as necessary
        this.timeoutId = setTimeout(this.handleNavigation.bind(this), 4000); 
    }
    doExpensiveThing() 
    { this.verifying = false;
        this.verifying2=true;

       
        // Do something here
    }
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



closeModal2()
{
    this.verifying = false;

}

    pattern = '.{1,}';


 }