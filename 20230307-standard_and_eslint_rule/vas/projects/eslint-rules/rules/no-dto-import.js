"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFunction = exports.RULE_NAME = void 0;
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const selectors_1 = require("../utils/selectors");
exports.RULE_NAME = 'no-dto-import';
exports.default = create_eslint_rule_1.createEslintRule({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'All DTO models should be used only inside special Endpoint services to avoid sharing DTO models across a project. Create a new model or inherit from the current one.',
            recommended: 'error',
        },
        schema: [],
        messages: {
            avoidDtoImport: 'Use DTO models only in endpoint classes *.endpoint.ts.',
        },
    },
    defaultOptions: [],
    create: (context) => {
        return {
            [selectors_1.IMPORT_DECORATOR](node) {
                checkFunction(node, context);
            },
        };
    },
});
function checkFunction(node, context) {
    const path = node.source.value;
    if (!path) {
        return;
    }
    const searchPath = 'vas-generated';
    const VALID_SEGMENTS = ['.endpoint.ts', '.models.ts'];
    const filename = context.getFilename();
    if (path.includes(searchPath) &&
        VALID_SEGMENTS.every((validSegment) => !filename.includes(validSegment))) {
        context.report({
            messageId: 'avoidDtoImport',
            loc: node.loc,
        });
    }
    else {
        return;
    }
}
exports.checkFunction = checkFunction;
