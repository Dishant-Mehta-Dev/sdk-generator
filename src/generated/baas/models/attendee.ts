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



/**
 * 
 * @export
 * @interface Attendee
 */
export interface Attendee {
    /**
     * The email address of the meeting attendee
     * @type {string}
     * @memberof Attendee
     */
    'email': string;
    /**
     * The display name of the attendee if available from the calendar provider (Google, Microsoft)
     * @type {string}
     * @memberof Attendee
     */
    'name'?: string | null;
}

