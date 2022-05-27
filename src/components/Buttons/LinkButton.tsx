import {MouseEventHandler} from 'react';
import cn from 'classnames';

type variant = 'primary' | 'dangerous';
interface P
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
  variant?: variant;
}

export function LinkButton({
  text,
  onClickHandler,
  variant = 'primary',
  ...rest
}: P): React.ReactElement<P> {
  return (
    <span
      onClick={onClickHandler}
      className={cn('link-button', rest?.className, {
        'link-button_primary': variant === 'primary',
        'link-button_dangerous': variant === 'dangerous',
      })}
    >
      {text}
    </span>
  );
}
