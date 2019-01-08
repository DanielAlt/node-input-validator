const assert = require('assert');

const Validator = require('../../index');


describe('#same', function () {

    it('should pass', async () => {

        let v, matched;

        v = new Validator(
            { password: '000000', confirm_password: '000000' },
            { password: 'required', confirm_password: 'required|same:password' });

        matched = await v.check();

        assert.equal(matched, true);
    })

    it('should fail', async () => {

        const v = new Validator(
            { password: '000000', confirm_password: '123456' },
            { password: 'required', confirm_password: 'required|same:password' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

});