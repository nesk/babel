import * as t from "../../../types";

export var metadata = {
  group: "builtin-trailing"
};

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  Program(node, parent, scope, file) {
    for (var comment of (file.ast.comments: Array)) {
      if (comment.value.indexOf("@flow") >= 0) {
        comment._displayed = true;
      }
    }
  },

  /**
   * [Please add a description.]
   */

  Flow() {
    this.dangerouslyRemove();
  },

  /**
   * [Please add a description.]
   */

  ClassProperty(node) {
    node.typeAnnotation = null;
    if (!node.value) this.dangerouslyRemove();
  },

  /**
   * [Please add a description.]
   */

  Class(node) {
    node.implements = null;
  },

  /**
   * [Please add a description.]
   */

  Function(node) {
    for (var i = 0; i < node.params.length; i++) {
      var param = node.params[i];
      param.optional = false;
    }
  },

  /**
   * [Please add a description.]
   */

  TypeCastExpression(node) {
    do {
      node = node.expression;
    } while(t.isTypeCastExpression(node));
    return node;
  },

  /**
   * [Please add a description.]
   */

  ImportDeclaration(node) {
    if (node.importKind === "type" || node.importKind === "typeof") this.dangerouslyRemove();
  },

  /**
   * [Please add a description.]
   */

  ExportDeclaration() {
    if (this.get("declaration").isTypeAlias()) this.dangerouslyRemove();
  }
};
