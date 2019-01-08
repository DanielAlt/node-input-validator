'use strict';

/**
 * node-input-validator
 * https://github.com/artisangang/node-input-validator
 */

const Validator = require('./src/index');
const messages = require('./src/messages');

// main validator class
module.exports = Validator;

/**
 * set default language
 */
module.exports.setLang = (lang) => {
    messages.defaultLang = lang;
};

/**
 * add custom validation rules
 * @param rule
 * @param func
 */
module.exports.extend = (rule, func) => {

    Validator.rules[rule] = func;

};

/**
 * extend/update validation rule default messages
 */
module.exports.messages = (newMessages, lang = 'en') => {

    if (typeof messages[lang] == 'undefined') {
        messages[lang] = {};
    }

    messages[lang] = Object.assign(messages[lang], newMessages);

};

/**
 * add/update your own custom validation messages
 */
module.exports.customMessages = (customMessages, lang = 'en') => {


    if (typeof messages[lang] == 'undefined') {
        messages[lang] = {};
    }

    messages[lang].custom = Object.assign(messages[lang].custom || {}, customMessages);

};

/* istanbul ignore next */
module.exports.koa = () => {

    return async (ctx, next) => {

        ctx.validate = async (inputs, rules, messages) => {

            let v = new Validator(
                inputs,
                rules,
                messages || {}
            );

            return v;
        };

        await next();
    };

};