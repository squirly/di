import {Binding} from './Binding';
import {Resolution} from './Container';

const DEPENDENCY_OPERATOR = ' -> ';

export class DependencyResolutionError extends Error {
  static descriptionFromResolution({tag, name}: Resolution<any>): string {
    const tagDescription = DependencyResolutionError.descriptionFromTag(tag);

    if (name === undefined || name === tagDescription) {
      return tagDescription;
    } else {
      return `${name} implements ${tagDescription}`;
    }
  }

  static descriptionFromTag(tag: Binding.Tag<any>): string {
    return tag.toString().slice(7, -1) || 'Un-named Service';
  }

  innerError: Error;
  chain: Array<Resolution<any>>;

  constructor(
    error: Error,
    chain: Array<Resolution<any>>,
    tag?: Binding.Tag<any>,
  ) {
    const chainMessage =
      chain.length === 0
        ? undefined
        : `Resolution chain: ${chain
            .map(DependencyResolutionError.descriptionFromResolution)
            .concat(
              tag ? [DependencyResolutionError.descriptionFromTag(tag)] : [],
            )
            .join(DEPENDENCY_OPERATOR)}.`;

    super([error.message, chainMessage].filter(m => m).join(' '));

    this.innerError = error;
    this.chain = chain;
    Object.setPrototypeOf(this, DependencyResolutionError.prototype);
  }
}

export class MissingDependencyError extends DependencyResolutionError {
  constructor(tag: Binding.Tag<any>, chain: Array<Resolution<any>>) {
    super(
      new Error(
        `Could not find dependency bound to ${DependencyResolutionError.descriptionFromTag(
          tag,
        )}.`,
      ),
      chain,
      tag,
    );
    Object.setPrototypeOf(this, MissingDependencyError.prototype);
  }
}

export class CircularDependencyError extends DependencyResolutionError {
  constructor(tag: Binding.Tag<any>, chain: Array<Resolution<any>>) {
    super(
      new Error(
        `Circular dependency detected, ${DependencyResolutionError.descriptionFromTag(
          tag,
        )} already in resolution chain.`,
      ),
      chain,
    );
    Object.setPrototypeOf(this, CircularDependencyError.prototype);
  }
}
