import { expect } from 'chai';
import * as babel from 'babel-core';
import fs from 'fs';
import polyglotPlugin from 'src/plugin';
import { rmDirSync } from 'src/utils';

const pofile = 'tests/fixtures/resolve_simple_gettext.po';

const options = {
    presets: ['es2015'],
    plugins: [[polyglotPlugin, {
        resolve: { locale: 'en-us' },
        locales: {
            'en-us': pofile,
        },
    }]],
};

describe('Resolve ngettext (n is bound to scope)', () => {
    before(() => {
        rmDirSync('debug');
    });

    it('should resolve proper plural form of n', () => {
        // const expectedPath = 'tests/fixtures/expected_strip_polyglot_tags.js.src';
        const input = 'const n = 1; console.log(nt(a)`plural form with ${n} plurals`);';
        const result = babel.transform(input, options).code;
        console.log(result);
        // const expected = fs.readFileSync(expectedPath).toString();
        expect(result).to.eql(expected);
    });
});

