import {useEffect, useState} from 'react';
export interface Coords {
  left: number;
  top: number;
  width: number;
}

export function useBlockPosition(
  isOpen: boolean,
  inputRef: React.RefObject<HTMLInputElement>,
) {
  /* prettier-ignore */ const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const coords = getCoords(inputRef);
    setCoords(coords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return [coords];
}

export function getCoords(ref: React.RefObject<HTMLInputElement>): Coords | null {
  const box = ref.current?.getBoundingClientRect();

  if (box) {
    return {
      left: box.left,
      top: box.top + box.height,
      width: box.width,
    };
  }
  return null;
}
