/**
 * @author Asmita Chaudhari <Asmita.Chaudhari@dal.ca>
 *
 */

export class ContactUsModel {
  FirstName: string;
  Email: string;
  Message: string;

  constructor(FirstName: string, Email: string, Message: string) {
    this.FirstName = FirstName;
    this.Email = Email;
    this.Message = Message;
  }
}
