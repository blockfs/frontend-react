import { shallow, mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';

import BlockListItem from 'containers/BlockListItem';
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import BlocksList from '../index';

describe('<BlocksList />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(
      <BlocksList loading />
    );
    expect(renderedComponent.contains(<List component={LoadingIndicator} />)).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <BlocksList
          loading={false}
          error={{ message: 'Loading failed!' }}
        />
      </IntlProvider>
    );
    expect(renderedComponent.text()).toMatch(/Something went wrong/);
  });

  it('should render the Blocksitories if loading was successful', () => {
    const Blocks = [{
      owner: {
        login: 'mxstbr',
      },
      html_url: 'https://github.com/react-boilerplate/react-boilerplate',
      name: 'react-boilerplate',
      open_issues_count: 20,
      full_name: 'react-boilerplate/react-boilerplate',
    }];
    const renderedComponent = shallow(
      <BlocksList
        Blocks={Blocks}
        error={false}
      />
    );

    expect(renderedComponent.contains(<List items={Blocks} component={BlockListItem} />)).toEqual(true);
  });

  it('should not render anything if nothing interesting is provided', () => {
    const renderedComponent = shallow(
      <BlocksList
        Blocks={false}
        error={false}
        loading={false}
      />
    );

    expect(renderedComponent.html()).toEqual(null);
  });
});
