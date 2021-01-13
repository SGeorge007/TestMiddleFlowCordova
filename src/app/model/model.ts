export interface IWorkCenter{
    taxProSsoId: string,
    taxWorkspaceId: string,
    clientGuaId: string
}

export interface ITaxProProfileServiceInput {
    sso_id: string;
    search_mode: string;
}

export class TaxProProfileServiceInput implements ITaxProProfileServiceInput {
    sso_id : string;
    search_mode: string;
}

export interface IUserData {
    id: string;
    status?: string;
    modifiedOn? : Date;
    lastPage?: string;
    currentAccessToken?: string;
    isConsentGiven?: boolean;
    taxProImageURL?: string;
    isRefundAdvanceDisabled?: boolean;
    isRefundTransferDisabled?: boolean;
    isRefundDistributionDisabled?: boolean;
    token?: string;
    tokenCreatedAt?: Date;
    tokenExpiresAt?: Date;
    EmailAddress?: string;
    MobilePhone?: string;
}

export interface IUserDataSelectionDto {
    id: string;
    modifiedOn: Date;
    refundAdvanceOptions: IRefundAdvanceOptions;
    refundTransferOptions?: IRefundTransferOptions;
    refundDistributionOptions?: IRefundDistributionOptions;
    alertOptions?: AlertOptions;
    consent7216?: IConsent7216;
    idProofing?: idProofing;
}

export class UserDataSelectionDto implements IUserDataSelectionDto {
    id: string;
    modifiedOn: Date;
    refundAdvanceOptions: IRefundAdvanceOptions;
    refundTransferOptions?: IRefundTransferOptions;
    refundDistributionOptions?: IRefundDistributionOptions;
    alertOptions?: AlertOptions;
    consent7216?: IConsent7216;
    idProofing?: idProofing;
}

export interface IAlertOptions{
    contactInfo : ContactModel;
    taxFilingNotifications :EmailTextAlerts;
    refundAdvanceAlerts : EmailTextAlerts;
    isEmeraldCardEmailAlert: boolean;
}

export class AlertOptions implements IAlertOptions{
    contactInfo = new ContactModel();
    taxFilingNotifications :EmailTextAlerts;
    refundAdvanceAlerts : EmailTextAlerts;
    isEmeraldCardEmailAlert = false;
}


export interface IContactModel{
    mobileNumber: string;
    emailAddress: string;
}
export class ContactModel implements IContactModel{
    mobileNumber;   
    emailAddress;
}


export class EmailTextAlerts{
    isEmail: boolean = false;
    isText: boolean = false;
}

export interface IRefundAdvanceOptions {
    offerred: boolean;
    selected: boolean;
}

export class RefundAdvanceOptions implements IRefundAdvanceOptions{
    offerred = false;
    selected = false;
}

export interface IRefundTransferOptions{
    offerred: boolean;
    selected: boolean;
    stateRefundTransferSelected: boolean;
}

export class RefundTransferOptions implements IRefundTransferOptions{
    offerred = false;
    selected = false;
    stateRefundTransferSelected = false;
}


enum RefundDistributionTypes {
    NotSelected = 0,
    EmeraldCard = 1,
    DirectDeposit = 2,
    Check = 3
}
export interface IRefundDistributionOptions {
    offerred: boolean;
    refundDistributionType: RefundDistributionTypes;
    emeraldCardOptions: EmeraldCardOptions;
    directDepositOptions: IDirectDepositOptions;
}


export interface IEmeraldCardOptions{
    offerred: boolean;
    selected: boolean;
    workForGovtAgency: boolean;
    emeraldCardFundingOptions: EmeraldCardFundingOptions;
}
export class EmeraldCardOptions implements IEmeraldCardOptions{
    offerred = false;
    selected = false;
    workForGovtAgency = null;
    emeraldCardFundingOptions = new EmeraldCardFundingOptions();
}

export interface IEmeraldCardFundingOptions{
    cash: boolean;   
    payroll: boolean;
    notSure: boolean;
    cashOptions: CashOptions;
}
export class EmeraldCardFundingOptions implements IEmeraldCardFundingOptions{
    cash = false;   
    payroll = false;
    notSure = false;
    cashOptions = new CashOptions();
}

export class ICashOptions{
    tips: boolean;
    employer: boolean;
    otherBankAcount: boolean;
    paydayLender: boolean;
    familyOrFriends: boolean;
    other: boolean;
}
export class CashOptions implements ICashOptions{
    tips = false;
    employer = false;
    otherBankAcount = false;
    paydayLender = false;
    familyOrFriends = false;
    other = false;
}


export interface IDirectDepositOptions {
    offerred: boolean;
    selected: boolean;
    routingNumber: string;
    accountNumber: string;
 }
 
 export class DirectDepositOptions implements IDirectDepositOptions{
    offerred = false;
    selected = false;
    routingNumber = '';
    accountNumber = '';
 }


 export interface IConsent7216{
    refundTransferConsent: boolean;
    emeraldCardConsent: boolean;
    refundAdvanceConsent: boolean;
    primaryTaxpayerConsentDate: string;
    secondaryTaxpayerConsentDate: string;
    primaryTaxPayerSignature: string;
    secondaryTaxPayerSignature: string;
    agreed: boolean;
    isSpouseChecked: boolean;
}
export class Consent implements IConsent7216{
    refundTransferConsent = false;
    emeraldCardConsent = false;
    refundAdvanceConsent = false;
    primaryTaxpayerConsentDate:  string;
    secondaryTaxpayerConsentDate: string;
    primaryTaxPayerSignature: string;
    secondaryTaxPayerSignature: string;
    agreed = false;
    isSpouseChecked = false;
}

export interface idProofing{
    bankProofProduct: string,
    bankProofed: string,
    bPSoftFail: string,
    bPHardFail: string
}

