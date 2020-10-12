import React, { lazy, Suspense, memo } from 'react';
import { getElementControlName } from '../../../../utility/functions';

const GeneralContent = (props) => {
  const getElement = (name) => {
    let componentName = getElementControlName(name, props.type);
    let Element = lazy(() => import(`../../../Common/Elements/${componentName}`));

    return <Element
      name={`fields-${props.index}-${name}`}
      label={name}
      setLabel={props.setLabel}
      defaultValue={props.fieldData[name]}
      data={props.fieldData}
      index={props.index}
      type={props.type} />
  }

  return (
    <div className="og-item__content">
      {
        Object.keys(props.fieldData).map((keyName, keyIndex) =>
          <Suspense fallback={null} key={keyName + keyIndex}>
            {getElement(keyName, keyIndex)}
          </Suspense>
        )
      }
    </div>
  );
}

export default memo(GeneralContent, (prevProps, nextProps) => prevProps.index === nextProps.index);