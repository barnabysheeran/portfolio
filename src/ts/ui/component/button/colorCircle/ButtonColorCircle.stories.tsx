import type { Meta, StoryObj } from '@storybook/react-vite';

import { ButtonColorCircle } from './ButtonColorCircle';

const meta: Meta<typeof ButtonColorCircle> = {
  title: 'Components/Button/ButtonColorCircle',
  component: ButtonColorCircle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const WithIconProp: Story = {
  args: {
    size: 'medium',
  },
};