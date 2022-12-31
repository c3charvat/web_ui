import React, { useEffect } from "react";
import { styled } from '@mui/material/styles';


export const AutoScrollingTextArea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { autoScroll?: boolean }
> = (props) => {
  const element = React.useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!element.current || props.autoScroll === false) return;
    element.current.scrollTop = element.current.scrollHeight;
  }, [props.autoScroll]);

  return <textarea {...props} style={{...props.style}} ref={element} />;
};

