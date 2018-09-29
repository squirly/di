export interface Binding<Serivce> {
  readonly Tag: Binding.Tag<Serivce>;
}

export function Binding<Service>(name: string): Binding<Service> {
  return {Tag: Binding.Tag(name)};
}

export namespace Binding {
  export type Tag<Service> = symbol & {
    __service__: Service;
  };

  export function Tag<Service>(name: string): Tag<Service> {
    return Symbol(name) as Tag<Service>;
  }
}
