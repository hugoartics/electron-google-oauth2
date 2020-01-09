import { EventEmitter } from 'events';
import { OAuth2Client } from 'google-auth-library';
import { Credentials } from 'google-auth-library/build/src/auth/credentials';
import LoopbackRedirectServer from './LoopbackRedirectServer';
export declare class UserClosedWindowError extends Error {
    constructor();
}
/**
 * Tokens updated event
 *
 * @event ElectronGoogleOAuth2#tokens
 * @type {Credentials}
 */
export declare type ElectronGoogleOAuth2Options = {
    successRedirectURL: string;
    loopbackInterfaceRedirectionPort: number;
    refocusAfterSuccess: boolean;
};
export declare const defaultElectronGoogleOAuth2Options: ElectronGoogleOAuth2Options;
/**
 * Handle Google Auth processes through Electron.
 * This class automatically renews expired tokens.
 * @fires ElectronGoogleOAuth2#tokens
 */
export default class ElectronGoogleOAuth2 extends EventEmitter {
    oauth2Client: OAuth2Client;
    scopes: string[];
    protected server: LoopbackRedirectServer | null;
    protected options: ElectronGoogleOAuth2Options;
    /**
     * Create a new instance of ElectronGoogleOAuth2
     * @param {string} clientId - Google Client ID
     * @param {string} clientSecret - Google Client Secret
     * @param {string[]} scopes - Google scopes. 'profile' and 'email' will always be present
     * @param {string} successRedirectURL
     */
    constructor(clientId: string, clientSecret: string, scopes: string[], options?: Partial<ElectronGoogleOAuth2Options>);
    /**
     * Returns authUrl generated by googleapis
     * @param {boolean} forceAddSession
     * @returns {string}
     */
    generateAuthUrl(forceAddSession?: boolean): string;
    /**
     * Get authorization code for underlying authUrl
     * @param {boolean} forceAddSession
     * @returns {Promise<string>}
     */
    getAuthorizationCode(forceAddSession?: boolean): Promise<string>;
    /**
     * Get authorization code for given url
     * @param {string} urlParam
     * @returns {Promise<string>}
     */
    openAuthWindowAndGetAuthorizationCode(urlParam: string): Promise<string>;
    openAuthPageAndGetAuthorizationCode(urlParam: string): Promise<string>;
    /**
     * Get Google tokens for given scopes
     * @param {boolean} forceAddSession
     * @returns {Promise<Credentials>}
     */
    openAuthWindowAndGetTokens(forceAddSession?: boolean): Promise<Credentials>;
    setTokens(tokens: Credentials): void;
}
