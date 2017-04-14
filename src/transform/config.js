import * as transformers from '../transform/transformers';
import validateObject from '../helpers/validation/validate-object';
import validateArray from '../helpers/validation/validate-array';
import isString from '../helpers/general/is-string';
import parseObject from '../helpers/parsing/parse-object';


export default {
    id: {
        default: '',
        parse: input => input,
        validate: isString
    },

    transformer: {
        default: 'listOfMatches',
        parse: value => value,
        validate: value => transformers.hasOwnProperty(value)
    },

    changeToOutcome: {
        default: {
            3: 'win',
            1: 'draw',
            0: 'loss'
        },
        parse: input => parseObject(input),
        validate: obj => validateObject(obj,
            key => !Number.isNaN(key),
            value => ['win', 'draw', 'loss'].includes(value))
    },

    //post-transformers
    filterItems: {
        default: [],
        parse: input => input.split(','),
        validate: value => validateArray(value, isString)
    },

    collapseToRounds: {
        default: false,
        parse: input => input === 'true',
        validate: value => typeof value === 'boolean'
    },

    insertStartRound: {
        default: '0',
        parse: input => input,
        validate: isString
    },

    //listOfMatches
    locationFirst: {
        default: 'home',
        parse: input => input,
        validate: value => ['home', 'away'].includes(value)
    },

    //pointsTable
    extraColumnsNumber: {
        default: 0,
        parse: input => Number.parseInt(input, 10),
        validate: value => !Number.isNaN(value)
    }
};
