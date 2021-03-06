/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_BLOCKS = 'boilerplate/App/LOAD_BLOCKS';
export const LOAD_BLOCKS_SUCCESS = 'boilerplate/App/LOAD_BLOCKS_SUCCESS';
export const LOAD_BLOCKS_ERROR = 'boilerplate/App/LOAD_BLOCKS_ERROR';
export const LOAD_FILES = 'boilerplate/App/LOAD_FILES';
export const LOAD_FILES_SUCCESS = 'boilerplate/App/LOAD_FILES_SUCCESS';
export const LOAD_FILES_ERROR = 'boilerplate/App/LOAD_FILES_ERROR';
export const DEFAULT_LOCALE = 'en';
