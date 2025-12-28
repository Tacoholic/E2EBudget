import { Page,expect } from "playwright/test"


export class ToastMessageClass {
constructor(public page:Page){}
   
/**
 * You can verify the success or error toast message by passing
 * data test id and the toastMessage you're expecting
 * @param datatestid 
 * @param toastMessage 
 */
async verifyToastMessage(datatestid:string, toastMessage:string){
        await expect(this.page.getByTestId(datatestid)).toHaveText(toastMessage)
    }

}