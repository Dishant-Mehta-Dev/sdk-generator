/* tslint:disable */
/* eslint-disable */
/**
 * Meeting BaaS API
 * Meeting BaaS API
 *
 * The version of the OpenAPI document: 1.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import type { Provider } from './provider';

/**
 * 
 * @export
 * @interface CreateCalendarParams
 */
export interface CreateCalendarParams {
    /**
     * 
     * @type {string}
     * @memberof CreateCalendarParams
     */
    'oauth_client_id': string;
    /**
     * 
     * @type {string}
     * @memberof CreateCalendarParams
     */
    'oauth_client_secret': string;
    /**
     * 
     * @type {string}
     * @memberof CreateCalendarParams
     */
    'oauth_refresh_token': string;
    /**
     * 
     * @type {Provider}
     * @memberof CreateCalendarParams
     */
    'platform': Provider;
    /**
     * 
     * @type {string}
     * @memberof CreateCalendarParams
     */
    'raw_calendar_id'?: string | null;
}



