import type { Meta, StoryObj } from '@storybook/react-vite';

import MenuIconFlyout from './MenuIconFlyout';

const meta: Meta<typeof MenuIconFlyout> = {
  title: 'Menu/IconFlyout',
  component: MenuIconFlyout,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};