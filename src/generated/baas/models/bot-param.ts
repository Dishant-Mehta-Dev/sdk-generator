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
import type { AudioFrequency } from './audio-frequency';
// May contain unused imports in some cases
// @ts-ignore
import type { RecordingMode } from './recording-mode';
// May contain unused imports in some cases
// @ts-ignore
import type { SpeechToTextProvider } from './speech-to-text-provider';

/**
 * 
 * @export
 * @interface BotParam
 */
export interface BotParam {
    /**
     * 
     * @type {string}
     * @memberof BotParam
     */
    'bot_image'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BotParam
     */
    'botName': string;
    /**
     * 
     * @type {string}
     * @memberof BotParam
     */
    'deduplication_key'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BotParam
     */
    'enter_message'?: string | null;
    /**
     * Custom data object
     * @type {{ [key: string]: any; }}
     * @memberof BotParam
     */
    'extra': { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof BotParam
     */
    'noone_joined_timeout'?: number | null;
    /**
     * 
     * @type {RecordingMode}
     * @memberof BotParam
     */
    'recording_mode'?: RecordingMode | null;
    /**
     * 
     * @type {string}
     * @memberof BotParam
     */
    'speech_to_text_api_key'?: string | null;
    /**
     * 
     * @type {SpeechToTextProvider}
     * @memberof BotParam
     */
    'speech_to_text_provider'?: SpeechToTextProvider | null;
    /**
     * 
     * @type {AudioFrequency}
     * @memberof BotParam
     */
    'streaming_audio_frequency'?: AudioFrequency | null;
    /**
     * 
     * @type {string}
     * @memberof BotParam
     */
    'streaming_input'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BotParam
     */
    'streaming_output'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof BotParam
     */
    'waiting_room_timeout'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof BotParam
     */
    'webhookUrl': string;
}



