import { useFormContext } from "react-hook-form";
import DivRow from './DivRow';

const { useState } = wp.element;

const Checkbox = ( { name, label, type, className, defaultValue, ...rest } ) => {
  const [ value, setValue ] = useState( defaultValue );
  const toggleCloneSettings = e => {
    if ( 'clone' !== rest.setting ) {
      return;
    }

    const displayValue = value ? 'none' : 'flex';
    e.target.closest( '.og-item' ).querySelectorAll( '.clone-setting' ).forEach( item => item.style.display = displayValue );
    setValue( prev => !prev );
  };

  const { register } = useFormContext();
  return <DivRow label={ label } className={ className } htmlFor={ name } { ...rest }>
    <input type="checkbox" id={ name } name={ name } onClick={ toggleCloneSettings } ref={ register } defaultChecked={ defaultValue } />
  </DivRow>;
};
export default Checkbox;