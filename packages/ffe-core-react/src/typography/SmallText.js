import React from 'react';
import { oneOfType, string, func } from 'prop-types';
import classNames from 'classnames';

const SmallText = ({ className, element: Element, ...rest }) => (
    <Element className={classNames('ffe-small-text', className)} {...rest} />
);

SmallText.defaultProps = {
    element: 'span',
};

SmallText.propTypes = {
    element: oneOfType([func, string]),
    className: string,
};

export default SmallText;
