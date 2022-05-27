import {MouseEventHandler} from 'react';
import cn from 'classnames';
import Image from '../Image';

interface P
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
  svg: string;
}

export function IconButton({onClickHandler, svg, ...rest}: P): React.ReactElement<P> {
  return (
    <span onClick={onClickHandler} className={cn('icon-button', rest?.className, {})}>
      <Image svg={svg} />
    </span>
  );
}
