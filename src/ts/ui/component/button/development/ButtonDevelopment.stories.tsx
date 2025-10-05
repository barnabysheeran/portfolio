import type { Meta, StoryObj } from '@storybook/react-vite';

import { ButtonDevelopment } from './ButtonDevelopment';

const meta: Meta<typeof ButtonDevelopment> = {
  title: 'Components/Button/ButtonDevelopment',
  component: ButtonDevelopment,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Click me',
  },
};
