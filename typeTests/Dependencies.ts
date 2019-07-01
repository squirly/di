import {Binding} from '@squirly/di';

// Bound types

export type A = string & {_: 'A'};
export type A0 = string & {_: 'A'; '1': 'A'};
export const A = Binding<A>('A');

export type B = string & {_: 'B'};
export const B = Binding<B>('B');

export type C = string & {_: 'C'};
export const C = Binding<B>('C');

// Injectable values

let a: A = 'a' as A;
let a0: A0 = 'a0' as A0;
let b: B = 'b' as B;
let c: C = 'c' as C;

// Assignability tests

a = a0;
a = b; // $ExpectError
a = c; // $ExpectError
a0 = a; // $ExpectError
b = a; // $ExpectError
b = c; // $ExpectError
c = a; // $ExpectError
c = b; // $ExpectError
