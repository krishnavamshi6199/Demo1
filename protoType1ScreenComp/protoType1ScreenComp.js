import { LightningElement } from 'lwc';


export default class ProtoType1ScreenComp extends LightningElement 
{
   
    SalaryValue;

    get options() {
        return [
            { label: '<100000', value: '<100000' },

            { label: '100000 - 200000', value: '100000 - 200000' },

            { label: '>200000', value: '>200000' },
        ];
    }

    handleChange(event) {
        this.SalaryValue = event.detail.value;
    }

ValueOfSelectedEmployement;

handleChangeForEmployementType(event) {
    this.ValueOfSelectedEmployement = event.detail.value;

}
get optionsForEmploymentType() {
    return [
        { label: 'Self-Employed', value: 'Self-Employed' },
       { label: 'Employee', value: 'Employee' },
        { label: 'Freelancer', value: 'Freelancer' },
    ];

}

ValueOfSelectedTypeOfBankAccount;
handleChangeForBankAccountTypeSelection(event)
{
this.ValueOfSelectedTypeOfBankAccount=event.target.value;
}
get OptionsForBankAccountType()

{
    return [
    {label:'Savings Account',value:'Savings Account'},
    {label:'Salary Account',value:'Salary Account'},
    {label:'Recurring Deposit Account',value:'Recurring Deposit Account'}
]}


}