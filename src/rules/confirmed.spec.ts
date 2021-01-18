import { Messages } from "../messages";
import { confirmed } from "./confirmed.rule";
import { ValidatorMock } from '../mock/validator.mock';

describe('rules:confirmed', () => {

  test("should pass", function (): void {
    const ruleHandler = confirmed().handler;
    expect(ruleHandler('123456', new ValidatorMock({ 'passwordConfirmation': '123456' }), 'password'))
      .toBe(true);
  });

  test("should fail", function (): void {
    const ruleHandler = confirmed().handler;
    expect(ruleHandler('1234560', new ValidatorMock({ 'passwordConfirmation': '123456' }), 'password'))
      .toBe(false);
    expect(ruleHandler('1234560', new ValidatorMock({}), 'password'))
      .toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('confirmed');
  });
});
