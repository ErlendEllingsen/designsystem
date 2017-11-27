import React, { Component } from 'react';
import { bool, node, oneOf, string } from 'prop-types';
import classNames from 'classnames';

import { checkForNestedComponent } from './utils';

export const VALID_BACKGROUND_COLORS = [
    'blue-cobalt',
    'blue-ice',
    'blue-pale',
    'blue-royal',
    'green-mint',
    'grey-cloud',
    'purple-magenta',
    'sand',
];

export default class GridRow extends Component {

    componentDidMount() {
        if (process.env.NODE_ENV !== 'production') {
            checkForNestedComponent(this.props.children, GridRow);
        }
    }

    render() {
        const {
            background,
            className,
            children,
            element,
            reverse,
            topPadding,
            ...rest
        } = this.props;

        let content = children;

        const hasBackgroundColor = VALID_BACKGROUND_COLORS.includes(background);

        if (hasBackgroundColor) {
            content = <div className="ffe-grid__row-wrapper">{children}</div>;
        }

        const Element = element || 'div';

        return (
            <Element
                className={
                    classNames(
                        className,
                        'ffe-grid__row',
                        { [`ffe-grid__row--bg-${background}`]: hasBackgroundColor },
                        { 'ffe-grid__row--reverse': reverse },
                        { 'ffe-grid__row--top-padding': topPadding },
                    )
                }
                {...rest}
            >
                {content}
            </Element>
        );
    }
}

GridRow.propTypes = {
    background: oneOf(VALID_BACKGROUND_COLORS),
    className: string,
    children: node,
    element: string,
    reverse: bool,
    topPadding: bool,
};
