import React from 'react';

/**
 * Implements action handling on clicking outside ref component
 * @param { Function } action - event on click outside component
 * @returns { React.MutableRefObject<any> } ref of wrapper element
 */
export const useOutsideClickEvent = action => {
    const wrapperRef = React.useRef(null);
    const handleClickOutside = event => {
        if (wrapperRef && !wrapperRef.current.contains(event.target)) {
            if (action instanceof Function) {
                action();
            }
        }
    };
    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return wrapperRef;
};
