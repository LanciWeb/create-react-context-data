'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * This function automatize the creation of React Context
 * @param reducer a reducer function.
 * @param actions contains all the callbacks we need to be available and  to the children in the Context so that they can dispatch them
 * @param initialState
 */
var _default = (reducer, actions, initialState) => {
  const Context = /*#__PURE__*/ _react.default.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = _react.default.useReducer(reducer, initialState);

    const boundActions = {};

    for (let type in actions) {
      boundActions[type] = actions[type](dispatch);
    }

    return /*#__PURE__*/ _react.default.createElement(
      Context.Provider,
      {
        value: {
          state,
          ...boundActions,
        },
      },
      children
    );
  };

  return {
    Context,
    Provider,
  };
};

exports.default = _default;
