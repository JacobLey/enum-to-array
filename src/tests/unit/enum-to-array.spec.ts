import { expect } from 'chai';
import { expectTypeOf } from 'expect-type';
import * as EnumToArray from '../../enum-to-array.js';

export const EnumToArraySpec = {
    enumToArray: {
        'Default values'() {
            enum Default {
                A,
                B,
                C,
                D,
            }

            expectTypeOf(EnumToArray.enumToArray(Default)).toEqualTypeOf<
                (
                    | {
                          key: 'A';
                          value: Default.A;
                      }
                    | {
                          key: 'B';
                          value: Default.B;
                      }
                    | {
                          key: 'C';
                          value: Default.C;
                      }
                    | {
                          key: 'D';
                          value: Default.D;
                      }
                )[]
            >();
            expect(EnumToArray.enumToArray(Default)).to.deep.equal([
                { key: 'A', value: Default.A },
                { key: 'B', value: Default.B },
                { key: 'C', value: Default.C },
                { key: 'D', value: Default.D },
            ]);

            expectTypeOf(EnumToArray.enumToValues(Default)).toEqualTypeOf<Default[]>();
            expectTypeOf(EnumToArray.enumToValues(Default)).toEqualTypeOf<number[]>();
            expect(EnumToArray.enumToValues(Default)).to.deep.equal([
                Default.A,
                Default.B,
                Default.C,
                Default.D,
            ]);

            expectTypeOf(EnumToArray.enumToKeys(Default)).toEqualTypeOf<(keyof typeof Default)[]>();
            expectTypeOf(EnumToArray.enumToKeys(Default)).toEqualTypeOf<
                ('A' | 'B' | 'C' | 'D')[]
            >();
            expect(EnumToArray.enumToKeys(Default)).to.deep.equal(['A', 'B', 'C', 'D']);
        },

        'String literals'() {
            enum Opposite {
                FOO = 'BAR',
                ABC = 'XYZ',
                YES = 'NO',
                ONE = 'ZERO',
            }

            expectTypeOf(EnumToArray.enumToArray(Opposite)).toEqualTypeOf<
                (
                    | {
                          key: 'FOO';
                          value: Opposite.FOO;
                      }
                    | {
                          key: 'ABC';
                          value: Opposite.ABC;
                      }
                    | {
                          key: 'YES';
                          value: Opposite.YES;
                      }
                    | {
                          key: 'ONE';
                          value: Opposite.ONE;
                      }
                )[]
            >();
            expect(EnumToArray.enumToArray(Opposite)).to.deep.equal([
                { key: 'FOO', value: Opposite.FOO },
                { key: 'ABC', value: Opposite.ABC },
                { key: 'YES', value: Opposite.YES },
                { key: 'ONE', value: Opposite.ONE },
            ]);

            expectTypeOf(EnumToArray.enumToValues(Opposite)).toEqualTypeOf<Opposite[]>();
            expect(EnumToArray.enumToValues(Opposite)).to.deep.equal([
                Opposite.FOO,
                Opposite.ABC,
                Opposite.YES,
                Opposite.ONE,
            ]);

            expectTypeOf(EnumToArray.enumToKeys(Opposite)).toEqualTypeOf<
                (keyof typeof Opposite)[]
            >();
            expectTypeOf(EnumToArray.enumToKeys(Opposite)).toEqualTypeOf<
                ('FOO' | 'ABC' | 'YES' | 'ONE')[]
            >();
            expect(EnumToArray.enumToKeys(Opposite)).to.deep.equal(['FOO', 'ABC', 'YES', 'ONE']);
        },

        'keys are values'() {
            enum Colors {
                WHITE = 'WHITE',
                BLACK = 'BLACK',
                BLUE = 'BLUE',
            }

            expectTypeOf(EnumToArray.enumToArray(Colors)).toEqualTypeOf<
                (
                    | {
                          key: 'WHITE';
                          value: Colors.WHITE;
                      }
                    | {
                          key: 'BLACK';
                          value: Colors.BLACK;
                      }
                    | {
                          key: 'BLUE';
                          value: Colors.BLUE;
                      }
                )[]
            >();
            expect(EnumToArray.enumToArray(Colors)).to.deep.equal([
                { key: 'WHITE', value: Colors.WHITE },
                { key: 'BLACK', value: Colors.BLACK },
                { key: 'BLUE', value: Colors.BLUE },
            ]);

            expectTypeOf(EnumToArray.enumToValues(Colors)).toEqualTypeOf<Colors[]>();
            expect(EnumToArray.enumToValues(Colors)).to.deep.equal([
                Colors.WHITE,
                Colors.BLACK,
                Colors.BLUE,
            ]);

            expectTypeOf(EnumToArray.enumToKeys(Colors)).toEqualTypeOf<(keyof typeof Colors)[]>();
            expect(EnumToArray.enumToKeys(Colors)).to.deep.equal(['WHITE', 'BLACK', 'BLUE']);
        },

        'Keys and values do not match'() {
            enum Colors {
                WHITE = 'BLUE',
                BLACK = 'WHITE',
                BLUE = 'BLACK',
            }

            expectTypeOf(EnumToArray.enumToArray(Colors)).toEqualTypeOf<
                (
                    | {
                          key: 'WHITE';
                          value: Colors.WHITE;
                      }
                    | {
                          key: 'BLACK';
                          value: Colors.BLACK;
                      }
                    | {
                          key: 'BLUE';
                          value: Colors.BLUE;
                      }
                )[]
            >();
            expect(EnumToArray.enumToArray(Colors)).to.deep.equal([
                { key: 'WHITE', value: Colors.WHITE },
                { key: 'BLACK', value: Colors.BLACK },
                { key: 'BLUE', value: Colors.BLUE },
            ]);

            expectTypeOf(EnumToArray.enumToValues(Colors)).toEqualTypeOf<Colors[]>();

            expectTypeOf(EnumToArray.enumToKeys(Colors)).toEqualTypeOf<(keyof typeof Colors)[]>();
        },

        'Duplicate values'() {
            enum Duplicates {
                ONE = 1,
                WON = 1,
                TOO = 'TOO',
                TWO = 'TOO',
                FOUR = 'FOR',
                FOR = 'FORD',
                FORE = FOUR,
            }

            expectTypeOf(EnumToArray.enumToArray(Duplicates)).toEqualTypeOf<
                (
                    | {
                          key: 'ONE';
                          value: Duplicates.ONE;
                      }
                    | {
                          key: 'WON';
                          value: Duplicates.WON;
                      }
                    | {
                          key: 'TOO';
                          value: Duplicates.TOO;
                      }
                    | {
                          key: 'TWO';
                          value: Duplicates.TWO;
                      }
                    | {
                          key: 'FOUR';
                          value: Duplicates.FOUR;
                      }
                    | {
                          key: 'FOR';
                          value: Duplicates.FOR;
                      }
                    | {
                          key: 'FORE';
                          value: Duplicates.FORE;
                      }
                )[]
            >();
            expect(EnumToArray.enumToArray(Duplicates)).to.deep.equal([
                { key: 'ONE', value: Duplicates.ONE },
                { key: 'WON', value: Duplicates.WON },
                { key: 'TOO', value: Duplicates.TOO },
                { key: 'TWO', value: Duplicates.TWO },
                { key: 'FOUR', value: Duplicates.FOUR },
                { key: 'FOR', value: Duplicates.FOR },
                { key: 'FORE', value: Duplicates.FORE },
            ]);

            expectTypeOf(EnumToArray.enumToValues(Duplicates)).toEqualTypeOf<Duplicates[]>();
            expect(EnumToArray.enumToValues(Duplicates, { unique: true })).to.deep.equal([
                Duplicates.ONE,
                Duplicates.TOO,
                Duplicates.FOUR,
                Duplicates.FOR,
            ]);

            expectTypeOf(EnumToArray.enumToKeys(Duplicates)).toEqualTypeOf<
                (keyof typeof Duplicates)[]
            >();
            expectTypeOf(EnumToArray.enumToKeys(Duplicates)).toEqualTypeOf<
                ('ONE' | 'WON' | 'TOO' | 'TWO' | 'FOUR' | 'FOR' | 'FORE')[]
            >();
        },

        'Computed values'() {
            enum Computed {
                FIVE = 5,
                DOUBLE = FIVE * 2,
                HALF = DOUBLE / 2,
                NAN = NaN,
                Infinity = Infinity,
            }

            expectTypeOf(EnumToArray.enumToArray(Computed)).toEqualTypeOf<
                (
                    | {
                          key: 'FIVE';
                          value: typeof Computed.FIVE;
                      }
                    | {
                          key: 'DOUBLE';
                          value: typeof Computed.DOUBLE;
                      }
                    | {
                          key: 'HALF';
                          value: typeof Computed.HALF;
                      }
                    | {
                          key: 'NAN';
                          value: typeof Computed.NAN;
                      }
                    | {
                          key: 'Infinity';
                          value: typeof Computed.Infinity;
                      }
                )[]
            >();
            expect(EnumToArray.enumToArray(Computed)).to.deep.equal([
                { key: 'FIVE', value: Computed.FIVE },
                { key: 'DOUBLE', value: Computed.DOUBLE },
                { key: 'HALF', value: Computed.HALF },
                { key: 'NAN', value: Computed.NAN },
                { key: 'Infinity', value: Computed.Infinity },
            ]);

            expectTypeOf(EnumToArray.enumToValues(Computed)).toEqualTypeOf<Computed[]>();
            expect(EnumToArray.enumToValues(Computed, { unique: true })).to.deep.equal([
                Computed.FIVE,
                Computed.DOUBLE,
                Computed.NAN,
                Computed.Infinity,
            ]);

            expectTypeOf(EnumToArray.enumToKeys(Computed)).toEqualTypeOf<
                (keyof typeof Computed)[]
            >();
        },

        'Values are computed literals'() {
            const set = new Set([1, 2, 3]);
            const reg = /abc/u;
            enum Literals {
                // @ts-expect-error
                SET = set,
                // @ts-expect-error
                OBJ = {},
                // @ts-expect-error
                ARR = [],
                // @ts-expect-error
                NIL = null,
                // @ts-expect-error
                REG = reg,
            }

            expectTypeOf(EnumToArray.enumToArray(Literals)).toEqualTypeOf<
                (
                    | {
                          key: 'SET';
                          value: typeof Literals.SET;
                      }
                    | {
                          key: 'OBJ';
                          value: typeof Literals.OBJ;
                      }
                    | {
                          key: 'ARR';
                          value: typeof Literals.ARR;
                      }
                    | {
                          key: 'NIL';
                          value: typeof Literals.NIL;
                      }
                    | {
                          key: 'REG';
                          value: typeof Literals.REG;
                      }
                )[]
            >();
            expect(EnumToArray.enumToArray(Literals)).to.deep.equal([
                { key: 'SET', value: Literals.SET },
                { key: 'OBJ', value: Literals.OBJ },
                { key: 'ARR', value: Literals.ARR },
                { key: 'NIL', value: Literals.NIL },
                { key: 'REG', value: Literals.REG },
            ]);

            expectTypeOf(EnumToArray.enumToValues(Literals)).toEqualTypeOf<Literals[]>();

            expectTypeOf(EnumToArray.enumToKeys(Literals)).toEqualTypeOf<
                (keyof typeof Literals)[]
            >();
        },

        'Empty enum'() {
            enum Empty {}

            expectTypeOf(EnumToArray.enumToArray(Empty)).toEqualTypeOf<[]>();
            expect(EnumToArray.enumToArray(Empty)).to.deep.equal([]);

            expectTypeOf(EnumToArray.enumToValues(Empty)).toEqualTypeOf<[]>();

            expectTypeOf(EnumToArray.enumToKeys(Empty)).toEqualTypeOf<[]>();
        },
    },
};
