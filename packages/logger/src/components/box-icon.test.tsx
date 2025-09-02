import { describeComponentRender } from '~/__tests__';
import { Icon } from '~/types';
import { BoxIcon } from './box-icon';

describeComponentRender({
  name: 'box-icon',
  node: data => <BoxIcon icon={data.icon} width={2} />,
  cases: [
    { name: 'none', icon: Icon.None, text: '' },
    { name: 'space', icon: Icon.Space, text: '  ' },
    { name: 'info', icon: Icon.Info, text: 'i ' },
    { name: 'pending', icon: Icon.Pending, text: '◌ ' },
    { name: 'running', icon: Icon.Running, text: '⠋ ' },
    { name: 'success', icon: Icon.Success, text: '√ ' },
    { name: 'error', icon: Icon.Error, text: '× ' },
    { name: 'string length = 1', icon: 'x', text: 'x ' },
    { name: 'string length = 2', icon: 'xx', text: 'xx' },
    { name: 'string length = 5', icon: '.....', text: '..' },
  ],
});
