const assert = require('assert');

const Validator = require('../../index');


let r = {};


describe('email', function () {

    it('validation should pass', async () => {

        const v = new Validator(
            { attribute: 'user@example.com' },
            { attribute: 'email' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });


    it('validation should fail: mising attribute', async () => {

        const v = new Validator(
            { attribute: 'form@example' },
            { attribute: 'email' }
        );

        const matched = await v.check();

        assert.equal(matched, false);

        //console.log(v.errors);

    });

});
