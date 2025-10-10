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
    src: 'https://fastly.picsum.photos/id/932/200/300.jpg?hmac=OPuowRV-58KJtDQbeEri4K8Am_UBqq9o0OFtn3S1ZYk',
    alt: 'A random image',
    width: 400,
    height: 300,
  },
};

export const FromProps: Story = {
  args: {
    src: 'https://fastly.picsum.photos/id/932/200/300.jpg?hmac=OPuowRV-58KJtDQbeEri4K8Am_UBqq9o0OFtn3S1ZYk',
    alt: 'Another random image',
    width: 200,
    height: 150,
  },
};
