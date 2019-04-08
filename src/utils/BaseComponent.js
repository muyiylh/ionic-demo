/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2019/2/13
 */
import React from 'react';
import PropTypes from 'prop-types';

class BaseComponent extends React.Component{
    constructor(props){
        super(props);
    }
    static contextTypes = {
        token: PropTypes.string,
        user: PropTypes.any,
        setContext: PropTypes.func,
    };
}

export default BaseComponent;

