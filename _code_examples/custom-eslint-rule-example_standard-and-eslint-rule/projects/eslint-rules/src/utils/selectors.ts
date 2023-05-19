import { AST_NODE_TYPES } from '@typescript-eslint/experimental-utils';

export const ANY_ANGULAR_CLASS_DECORATOR =
  `${AST_NODE_TYPES.ClassDeclaration} > Decorator:matches(` +
  '[expression.callee.name="Component"], ' +
  '[expression.callee.name="Directive"], ' +
  '[expression.callee.name="Pipe"], ' +
  '[expression.callee.name="Injectable"], ' +
  '[expression.callee.name="NgModule"])';

export const IMPORT_DECORATOR = `${AST_NODE_TYPES.ImportDeclaration}`;
