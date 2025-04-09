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
import type { AutomaticLeaveRequest } from './automatic-leave-request';

/**
 * The bot will leave the meeting automatically after the timeout, defaults to 600 seconds.
 * @export
 * @interface JoinRequestAutomaticLeave
 */
export interface JoinRequestAutomaticLeave {
    /**
     * The timeout in seconds for the bot to wait for participants to join before leaving the meeting, defaults to 600 seconds
     * @type {number}
     * @memberof JoinRequestAutomaticLeave
     */
    'noone_joined_timeout'?: number;
    /**
     * The timeout in seconds for the bot to wait in the waiting room before leaving the meeting, defaults to 600 seconds
     * @type {number}
     * @memberof JoinRequestAutomaticLeave
     */
    'waiting_room_timeout'?: number;
}

