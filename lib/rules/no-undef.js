/**
 * @fileoverview Rule to flag references to undeclared variables.
 * @author Dhi Aurrahman
 * @copyright 2016 Dhi Aurrahman. All rights reserved.
 * @copyright 2015 Nicholas C. Zakas. All rights reserved.
 * @copyright 2013 Mark Macdonald. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Checks if the given node is the argument of a typeof operator.
 * @param {ASTNode} node The AST node being checked.
 * @returns {boolean} Whether or not the node is the argument of a typeof operator.
 */
function hasTypeOfOperator(node) {
    var parent = node.parent;
    return parent.type === "UnaryExpression" && parent.operator === "typeof";
}

/**
 * Checks if the given node is the argument of a typeof operator.
 * @param {ASTNode} node The AST node being checked.
 * @returns {boolean} Whether or not the node is the argument of a typeof operator.
 */
function isDestructuredFunctionParam(node) {
    var parent = node.parent;
    var ancestor = parent.parent;
    var sibling = parent.left;
    if (!ancestor && !parent.left) {
        return;
    }
    return (node.type === "Identifier"
            && parent.type === 'AssignmentPattern'
            && parent.left.type === 'ObjectPattern'
            && ancestor.type.indexOf('Function') === 0);
}
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var options = context.options[0];
    var considerTypeOf = options && options.typeof === true || false;
    var considerDestructuredFunctionParams = options && options.label === true || false;

    return {
        "Program:exit": function(/* node */) {
            var globalScope = context.getScope();

            globalScope.through.forEach(function(ref) {
                var identifier = ref.identifier;

                if (!considerTypeOf && hasTypeOfOperator(identifier)) {
                    return;
                }

                if (!considerDestructuredFunctionParams && isDestructuredFunctionParam(identifier)) {
                    return;
                }

                context.report({
                    node: identifier,
                    message: "'{{name}}' is not defined.",
                    data: identifier
                });
            });
        }
    };
};

module.exports.schema = [
    {
        "type": "object",
        "properties": {
            "typeof": {
                "type": "boolean"
            }
        },
        "additionalProperties": false
    }
];
