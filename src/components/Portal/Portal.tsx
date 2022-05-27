import {createPortal} from 'react-dom';

interface P {
  children: React.ReactElement;
}

function Portal({children}:P): React.ReactElement<P> {
  const portalRoot = document.getElementById('portal-root');
  return createPortal(children, portalRoot!);
}
export default Portal;
