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
 * @interface Bot2
 */
export interface Bot2 {
    /**
     * 
     * @type {number}
     * @memberof Bot2
     */
    'account_id': number;
    /**
     * 
     * @type {number}
     * @memberof Bot2
     */
    'bot_param_id': number;
    /**
     * 
     * @type {string}
     * @memberof Bot2
     */
    'created_at': string;
    /**
     * 
     * @type {boolean}
     * @memberof Bot2
     */
    'diarization_v2': boolean;
    /**
     * 
     * @type {string}
     * @memberof Bot2
     */
    'ended_at': string | null;
    /**
     * 
     * @type {string}
     * @memberof Bot2
     */
    'errors'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Bot2
     */
    'event_id'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof Bot2
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof Bot2
     */
    'meeting_url': string;
    /**
     * 
     * @type {string}
     * @memberof Bot2
     */
    'mp4_s3_path': string;
    /**
     * 
     * @type {boolean}
     * @memberof Bot2
     */
    'reserved': boolean;
    /**
     * 
     * @type {number}
     * @memberof Bot2
     */
    'scheduled_bot_id'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof Bot2
     */
    'session_id'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Bot2
     */
    'uuid': string;
}

