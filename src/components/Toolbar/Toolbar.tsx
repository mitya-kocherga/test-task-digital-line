import {Button, IconButton} from '../Buttons';
import CrossIcon from '../../assets/buttons/cross_icon.svg';

interface P {
  canDelete: boolean;
  onAdd: () => void;
  onDelete?: () => void;
}

function ToolbarComponent({canDelete, onAdd, onDelete}: P): React.ReactElement {
  return (
    <div className="toolbar">
      <div className="toolbar__container">
        <div className="toolbar__button-container">
          <Button onClickHandler={onAdd} className="toolbar__button" text="Copy table" />
          {canDelete && onDelete && (
            <IconButton onClickHandler={onDelete} svg={CrossIcon} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ToolbarComponent;
