/**
 * Given a union type, transforms it into an intersection type
 * e.g
 * type UnionType = {a: string} | {b: number}
 * type IntersectionType = UnionToIntersection<UnionType>
 *                       = {a: string} & {b: number}
 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

/**
 * Given a type, picks a single key from it similarly to using the standard Pick mapping,
 * but then flattens the type
 * e.g.
 * type Base = {a: number, b: string}
 * type Picked    = Pick<Base, 'a'>
 *                = {a: number}
 * type Flattened = PickAndFlatten<Base, 'a'>
 *                = number
 */
 export type PickAndFlatten<T, K extends keyof T> = UnionToIntersection<T[K]>;
