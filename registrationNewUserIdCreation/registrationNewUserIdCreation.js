import { LightningElement,track } from 'lwc';

export default class LightningExampleAccordionBasic extends LightningElement {
   @track displayDiv=false;
   showDivHandler()
   {
       this.displayDiv=true;
   }
   @track first=true;
@track sec=false;
showsec()
{
    this.sec=true;
    this.first=false;
}
@track four=false;
@track third=false;
showthir()
{
    this.sec=false;
    this.third=true;
}
showfourth()
{
    this.third=false;
    this.displayDiv=false;
    this.four=true;
}


}