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
 * @interface Word
 */
export interface Word {
    /**
     * 
     * @type {number}
     * @memberof Word
     */
    'botId': number;
    /**
     * 
     * @type {number}
     * @memberof Word
     */
    'endTime': number;
    /**
     * 
     * @type {number}
     * @memberof Word
     */
    'id': number;
    /**
     * 
     * @type {number}
     * @memberof Word
     */
    'startTime': number;
    /**
     * 
     * @type {string}
     * @memberof Word
     */
    'text': string;
    /**
     * 
     * @type {number}
     * @memberof Word
     */
    'user_id'?: number | null;
}

