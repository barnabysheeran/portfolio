import type { Meta, StoryObj } from '@storybook/react-vite';

import MenuFlyout from './MenuFlyout';

const meta: Meta<typeof MenuFlyout> = {
  title: 'Menu/Flyout',
  component: MenuFlyout,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};