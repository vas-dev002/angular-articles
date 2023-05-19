"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isParameterProperty = exports.isFunctionExpression = exports.isMethodDefinition = exports.isClassDeclaration = exports.isParameterPropertyReadonly = exports.isParameterPropertyAccessibilityNamed = exports.getParameterPropertiesFromMethodDefinition = exports.getConstructorFromClassDeclaration = exports.getClassDeclarationFromDecorator = void 0;
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
function getClassDeclarationFromDecorator(node) {
    const parent = node.parent;
    if (!isClassDeclaration(parent)) {
        return;
    }
    return parent;
}
exports.getClassDeclarationFromDecorator = getClassDeclarationFromDecorator;
function getConstructorFromClassDeclaration(node) {
    const body = node.body;
    if (!body) {
        return;
    }
    const classElements = body.body;
    if (!Array.isArray(classElements) || classElements.length === 0) {
        return;
    }
    const constructorMethodDefinition = classElements
        .filter(classElement => isMethodDefinition(classElement))
        .find(methodDefinition => methodDefinition.kind === 'constructor');
    if (!constructorMethodDefinition || !isMethodDefinition(constructorMethodDefinition)) {
        return;
    }
    return constructorMethodDefinition;
}
exports.getConstructorFromClassDeclaration = getConstructorFromClassDeclaration;
function getParameterPropertiesFromMethodDefinition(node) {
    const value = node.value;
    if (!isFunctionExpression(value)) {
        return undefined;
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return value.params.filter((node) => isParameterProperty(node));
}
exports.getParameterPropertiesFromMethodDefinition = getParameterPropertiesFromMethodDefinition;
function isParameterPropertyAccessibilityNamed(node, accessibility) {
    if (!isParameterProperty(node)) {
        return;
    }
    return node.accessibility === accessibility;
}
exports.isParameterPropertyAccessibilityNamed = isParameterPropertyAccessibilityNamed;
function isParameterPropertyReadonly(node) {
    if (!isParameterProperty(node)) {
        return;
    }
    return node.readonly;
}
exports.isParameterPropertyReadonly = isParameterPropertyReadonly;
function isClassDeclaration(node) {
    return node.type === experimental_utils_1.AST_NODE_TYPES.ClassDeclaration;
}
exports.isClassDeclaration = isClassDeclaration;
function isMethodDefinition(node) {
    return node.type === experimental_utils_1.AST_NODE_TYPES.MethodDefinition;
}
exports.isMethodDefinition = isMethodDefinition;
function isFunctionExpression(node) {
    return node.type === experimental_utils_1.AST_NODE_TYPES.FunctionExpression;
}
exports.isFunctionExpression = isFunctionExpression;
function isParameterProperty(node) {
    return node.type === experimental_utils_1.AST_NODE_TYPES.TSParameterProperty;
}
exports.isParameterProperty = isParameterProperty;
