import React, { useState } from 'react';
import DraggleIcon from '../DraggleIcon';


export default function DragglePage(props) {
  const { children, className, element, style, disable } = props;
  const [isDarging, setIsDraging] = useState(false);
  const [position, setPosition] = useState({ offsetX: 0, offsetY: 0 });
  function handleDragStart(e) {
    e.persist();
    e.dataTransfer.setData('element', JSON.stringify(element));
    setPosition({
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    });
  }
  function handleDragEnd(e) {
    e.persist();
    const left = e.pageX - position.offsetX;
    const top = e.pageY - position.offsetY;
    e.target.style.opacity = '';
    setIsDraging(false);
  }
  function handleMouseEnter() {
    if (!disable) {
      setIsDraging(true);
    }
  }
  function handleMouseLeave() {
    if (!disable) {
      setIsDraging(false);
    }
  }

  return (
    <div
      draggable={!disable}
      className={`${className} ${disable ? 'used-selected' : ''}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {isDarging && <DraggleIcon className='left-draging-icon' />}
      {children}
    </div>
  );
}
