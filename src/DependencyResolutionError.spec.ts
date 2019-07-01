import {Binding} from './Binding';
import {DependencyResolutionError} from './DependencyResolutionError';

describe('DependencyResolutionError', () => {
  describe('.descriptionFromTag', () => {
    describe('passed binding with no name', () => {
      it('returns placeholder', () => {
        expect(
          DependencyResolutionError.descriptionFromTag(Binding.Tag<string>('')),
        ).toBe('Un-named Service');
      });
    });
  });
});
