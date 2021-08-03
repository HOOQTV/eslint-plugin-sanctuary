# eslint-plugin-sanctuary

**Migrated to https://github.coupang.net/coupang/couplay-eslint-plugin-sanctuary**

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-sanctuary`:

```
$ npm install eslint-plugin-sanctuary --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-sanctuary` globally.

## Usage

Add `sanctuary` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "sanctuary"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "sanctuary/rule-name": 2
    }
}
```

## Supported Rules

Following rules are sanctuary flavored!

* `no-undef`

