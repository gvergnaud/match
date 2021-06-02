import { match, when } from '../src';

describe('Branded strings', () => {
  type BrandedId = string & { __brand: 'brandId' };
  type FooBar = { type: 'foo'; id: BrandedId; value: string } | { type: 'bar' };
  type State = {
    fooBar: FooBar;
    fooBarId: BrandedId;
  };

  it('should treat branded strings as regular string, and not as objects', () => {
    const state: State = {
      fooBar: { type: 'foo', id: '' as BrandedId, value: 'value' },
      fooBarId: '' as BrandedId,
    };

    expect(
      match(state)
        .with(
          { fooBar: { type: 'foo' }, fooBarId: when((id) => id === '') },
          (x) => `Match: ${x.fooBar.value}`
        )
        .otherwise(() => 'nope')
    ).toEqual('Match: value');
  });
});
