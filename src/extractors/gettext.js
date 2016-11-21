import * as t from 'babel-types';
import { getQuasiStr, strToQuasi } from '../utils';
import { PO_PRIMITIVES } from '../defaults';
const { MSGID, MSGSTR } = PO_PRIMITIVES;

function extract({ node }) {
    return {
        [MSGID]: getQuasiStr(node),
        [MSGSTR]: '',
    };
}

function match({ node }, config) {
    return t.isTaggedTemplateExpression(node) && node.tag.name === config.getAliasFor('gettext');
}

function resolve(path, translates) {
    const { node } = path;
    let transStr = getQuasiStr(node);
    const hasExpressions = Boolean(node.quasi.expressions.length);
    const translationObj = translates[transStr];

    if (translationObj && translationObj[MSGSTR] && translationObj[MSGSTR][0]) {
        transStr = translationObj[MSGSTR][0];
    }

    if (translationObj && hasExpressions) {
        path.replaceWithSourceString(strToQuasi(transStr));
    } else {
        path.replaceWith(t.stringLiteral(transStr));
    }
}

export default { match, extract, resolve };
