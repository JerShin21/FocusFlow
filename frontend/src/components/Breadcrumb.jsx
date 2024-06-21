import React from 'react'
import PropTypes from 'prop-types'

function Breadcrumb({ items }) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            {items.map((item, index) => (
                <li
                key={index}
                className={`breadcrumb-item ${item.active ? 'active' : ''}`}
                aria-current={item.active ? 'page' : undefined}
                >
                {item.active ? (
                    item.label
                ) : (
                    <a href={item.href}>{item.label}</a>
                )}
                </li>
            ))}
            </ol>
        </nav>
    );
}

Breadcrumb.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string,
            active: PropTypes.bool,
        })
    ).isRequired,
};

export default Breadcrumb
