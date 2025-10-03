import type { Meta, StoryObj } from '@storybook/react-vite';

import { ButtonIcon } from './ButtonIcon';

const meta: Meta<typeof ButtonIcon> = {
  title: 'Components/Icon/ButtonIcon',
  component: ButtonIcon,
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
    children: { control: 'text' },
    icon: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'small',
    children: '★',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: '★',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: '★',
  },
};

export const WithIconProp: Story = {
  args: {
    size: 'medium',
    icon: '⚡',
  },
};