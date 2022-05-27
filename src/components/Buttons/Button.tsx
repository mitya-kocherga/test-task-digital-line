import {MouseEventHandler} from 'react';
import cn from 'classnames';

interface P
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  text,
  onClickHandler,
  className,
  ...rest
}: P): React.ReactElement<P> {
  return (
    <button onClick={onClickHandler} className={cn('button', className)} {...rest}>
      {text}
    </button>
  );
}
