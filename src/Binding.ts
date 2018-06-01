import {Brand} from 'ts-brand';

export interface Binding<Serivce> {
  Tag: Binding.Tag<Serivce>;
}

export function Binding<Service>(name: string): Binding<Service> {
  return {Tag: Binding.Tag(name)};
}

export namespace Binding {
  export type Tag<Service> = Brand<symbol, Service, '__service'>;

  export function Tag<Service>(name: string): Tag<Service> {
    return Symbol(name) as Tag<Service>;
  }
}
