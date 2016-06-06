/*
 * just for debug
 * will delete when env=pro
 */

import store from 'store';
import actions from 'actions';

window.store = store;
window.actions = actions;

import {debugApp} from './app.js';
window.app = debugApp;

import $ from 'jquery';
window.$ = $;