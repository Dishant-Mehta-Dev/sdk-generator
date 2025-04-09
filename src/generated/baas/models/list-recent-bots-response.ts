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
import type { RecentBotEntry } from './recent-bot-entry';

/**
 * 
 * @export
 * @interface ListRecentBotsResponse
 */
export interface ListRecentBotsResponse {
    /**
     * Timestamp of when this data was generated
     * @type {string}
     * @memberof ListRecentBotsResponse
     */
    'last_updated': string;
    /**
     * Cursor for fetching the next page, null if no more results
     * @type {string}
     * @memberof ListRecentBotsResponse
     */
    'next_cursor'?: string | null;
    /**
     * List of recent bots with metadata
     * @type {Array<RecentBotEntry>}
     * @memberof ListRecentBotsResponse
     */
    'recent_bots': Array<RecentBotEntry>;
}

