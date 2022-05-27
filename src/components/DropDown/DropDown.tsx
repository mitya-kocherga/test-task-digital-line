import {useEffect, useRef, useState} from 'react';
import cn from 'classnames';
import Image from '../Image';
import Portal from '../Portal';
import ArrowDown from '../../assets/dropdown/arrow_down.svg';
import ArrowUp from '../../assets/dropdown/arrow_up.svg';

interface P {
  value: string;
  onChangeHandler: (value: any) => void;
  placeholder?: string;
  menuList: Array<{
    value: string,
    label: string,
  }>;
}

interface Coords {
  left: number;
  top: number;
  width: number;
}

//TODO: add outside click
function DropDownComponent({
  value,
  onChangeHandler,
  placeholder,
  menuList,
}: P): React.ReactElement<P> {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  /* prettier-ignore */ const [coords, setCoords] = useState<Coords | null>(null);

  // ToDO move to separate hook
  const getCoords = (): Coords | null => {
    const box = inputRef.current?.getBoundingClientRect();

    if (box) {
      return {
        left: box.left,
        top: box.top + box.height,
        width: box.width,
      };
    }
    return null;
  };

  useEffect(() => {
    if (!isOpen) return;

    const coords = getCoords();
    setCoords(coords);
  }, [isOpen]);

  const clickHandler = (event: React.BaseSyntheticEvent) => {
    setIsOpen(!isOpen);
    onChangeHandler(event.target.id);
  };
  return (
    <div className="dropdown">
      <div
        className={cn('dropdown__input input', {dropdown__input_focus: isOpen})}
        onClick={() => setIsOpen(!isOpen)}
        ref={inputRef}
      >
        {!value && placeholder && (
          <span
            className={cn('dropdown__placeholder', {dropdown__placeholder_focus: isOpen})}
          >
            {placeholder}
          </span>
        )}
        {value && value}
        <Image svg={isOpen ? ArrowUp : ArrowDown} />
      </div>
      <Portal>
        <div
          style={{
            left: `${coords?.left}px`,
            top: `${coords?.top}px`,
          }}
          className={cn('dropdown__menu menu', {menu_open: isOpen})}
        >
          {menuList &&
            menuList.map(({value, label}) => (
              <div
                className="menu__list-item"
                key={value}
                id={value}
                onClick={clickHandler}
              >
                {label}
              </div>
            ))}
        </div>
      </Portal>
    </div>
  );
}

export default DropDownComponent;
