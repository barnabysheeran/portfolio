import type { Meta, StoryObj } from '@storybook/react-vite';

import ImageWrapper from './ImageWrapper';

const meta = {
  title: 'Image/ImageWrapper',
  component: ImageWrapper,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
} satisfies Meta<typeof ImageWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://source.unsplash.com/random/800x600',
    alt: 'A random image',
    width: 400,
    height: 300,
  },
};
