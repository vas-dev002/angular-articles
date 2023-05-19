"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMPORT_DECORATOR = exports.ANY_ANGULAR_CLASS_DECORATOR = void 0;
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
exports.ANY_ANGULAR_CLASS_DECORATOR = `${experimental_utils_1.AST_NODE_TYPES.ClassDeclaration} > Decorator:matches(` +
    '[expression.callee.name="Component"], ' +
    '[expression.callee.name="Directive"], ' +
    '[expression.callee.name="Pipe"], ' +
    '[expression.callee.name="Injectable"], ' +
    '[expression.callee.name="NgModule"])';
exports.IMPORT_DECORATOR = `${experimental_utils_1.AST_NODE_TYPES.ImportDeclaration}`;
