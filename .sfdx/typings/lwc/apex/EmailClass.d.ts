declare module "@salesforce/apex/EmailClass.sendSingleEmail" {
  export default function sendSingleEmail(param: {subject: any, body: any}): Promise<any>;
}
declare module "@salesforce/apex/EmailClass.getSendToAddress" {
  export default function getSendToAddress(): Promise<any>;
}
