import { RuleTester } from '@typescript-eslint/experimental-utils/dist/ts-eslint';
import rule, { MessageIds, RULE_NAME } from '../../src/rules/no-dto-import';

const ruleTester: RuleTester = new RuleTester({
  // @ts-ignore
  parser: require.resolve('@typescript-eslint/parser'),
});

const validStatements = [
  `
  import { RuleTester } from '@typescript-eslint/experimental-utils/dist/ts-eslint';
`,
];

const invalidStatements = [
  `
  import { ISuperDTO } from '../../vas-generated/models';
`,
];

const messageId: MessageIds = 'avoidDtoImport';

ruleTester.run(RULE_NAME, rule, {
  valid: validStatements,
  invalid: [{ code: invalidStatements[0], errors: [{ messageId }], output: null }],
});
