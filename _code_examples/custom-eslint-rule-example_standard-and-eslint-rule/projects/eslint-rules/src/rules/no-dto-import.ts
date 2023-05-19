import { TSESTree } from '@typescript-eslint/experimental-utils';
import { RuleContext } from '@typescript-eslint/experimental-utils/dist/ts-eslint';
import { createEslintRule } from '../utils/create-eslint-rule';
import { IMPORT_DECORATOR } from '../utils/selectors';

export const RULE_NAME = 'no-dto-import';
export type MessageIds = 'avoidDtoImport';
export type Options = [];

export default createEslintRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        'All DTO models should be used only inside special Endpoint services to avoid sharing DTO models across a project. Create a new model or inherit from the current one.',
      recommended: 'error',
    },
    schema: [],
    messages: {
      avoidDtoImport: 'Use DTO models only in endpoint classes *.endpoint.ts.',
    },
  },
  defaultOptions: [],
  create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
    return {
      [IMPORT_DECORATOR](node: TSESTree.ImportDeclaration) {
        checkFunction(node, context);
      },
    };
  },
});

export function checkFunction(
  node: TSESTree.ImportDeclaration,
  context: Readonly<RuleContext<MessageIds, Options>>
) {
  const path = node.source.value;
  if (!path) {
    return;
  }
  const searchPath = 'vas-generated';
  const VALID_SEGMENTS = ['.endpoint.ts', '.models.ts'];
  const filename = context.getFilename();
  if (
    path.includes(searchPath) &&
    VALID_SEGMENTS.every((validSegment) => !filename.includes(validSegment))
  ) {
    context.report({
      messageId: 'avoidDtoImport',
      loc: node.loc,
    });
  } else {
    return;
  }
}
