/** all interface and types of project, put here */
//
///**
// * 
// * @class 
//*/
//class InterfaceUserInfo {
//    id: string;
//    clientId: string | any;
//    clientSecret: string | any;
//}
//
///**
// * 
//* @class 
//*/
//class userLoginInterface {
//    username: string;
//    password: string;
//}
//
//class userRefreshToken {
//    refreshToken: string | any;
//}
//
//class userToken {
//    token?: string;
//    refreshToken?: string;
//}
//
//class createUser { }
//
//class findUserByEmailOrId {
//    params?: string | any;
//    token: string | any;
//}
//
//export declare enum RequiredActionAlias {
//    VERIFY_EMAIL = 'VERIFY_EMAIL',
//    UPDATE_PROFILE = 'UPDATE_PROFILE',
//    CONFIGURE_TOTP = 'CONFIGURE_TOTP',
//    UPDATE_PASSWORD = 'UPDATE_PASSWORD',
//    terms_and_conditions = 'terms_and_conditions',
//}
//
//class UserConsentRepresentation {
//    clientId?: string;
//    createDate?: string;
//    grantedClientScopes?: string[];
//    lastUpdatedDate?: number;
//}
//
//class CredentialRepresentation {
//    createdDate?: number;
//    credentialData?: string;
//    id?: string;
//    priority?: number;
//    secretData?: string;
//    temporary?: boolean;
//    type?: string;
//    userLabel?: string;
//    value?: string;
//}
//
//class FederatedIdentityRepresentation {
//    identityProvider?: string;
//    userId?: string;
//    userName?: string;
//}
//
//class UserRepresentation {
//    id?: string;
//    createdTimestamp?: number;
//    username?: string;
//    enabled?: boolean;
//    totp?: boolean;
//    emailVerified?: boolean;
//    access?: Record<string, boolean>;
//    attributes?: Record<string, any>;
//    clientConsents?: UserConsentRepresentation[];
//    clientRoles?: Record<string, any>;
//    credentials?: CredentialRepresentation[];
//    email?: string;
//    federatedIdentities?: FederatedIdentityRepresentation[];
//    federationLink?: string;
//    firstName?: string;
//    groups?: string[];
//    lastName?: string;
//    origin?: string;
//    realmRoles?: string[];
//    self?: string;
//    serviceAccountClientId?: string;
//    password?: string;
//    roles?: any;
//    employee_id?: number;
//}
//
//export const initialUserCredential = {
//    temporary: false,
//    value: '',
//};
//
//export const initialUserCreate = {
//    enabled: true,
//    emailVerified: true,
//    username: '',
//    email: '',
//    firstName: '',
//    lastName: '',
//    groups: ['colab'],
//    credentials: [
//        {
//            temporary: false,
//            value: '',
//        },
//    ],
//};
//
//
//
//module.exports = {
//    InterfaceUserInfo,
//    userLoginInterface,
//    userRefreshToken,
//    userToken,
//    createUser,
//    findUserByEmailOrId,
//    RequiredActionAlias,
//    UserConsentRepresentation,
//    CredentialRepresentation,
//    FederatedIdentityRepresentation,
//    UserRepresentation,
//    initialUserCredential,
//    initialUserCreate,
//}