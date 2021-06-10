/* eslint-disable @typescript-eslint/no-empty-function */
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { ClickCounterComponent, Props } from './ClickCounterComponent';

export default {
  title: 'Components/ClickCounter',
  component: ClickCounterComponent
} as Meta;

const Template: Story<Props> = (args: Props) => <ClickCounterComponent {...args} />;

/**
 * A click counter with zero click
 */
export const ZeroClicks = Template.bind({});
ZeroClicks.args = {
  clickCount: 0,
  onClick: () => {},
  onAsyncClick: () => {}
};
