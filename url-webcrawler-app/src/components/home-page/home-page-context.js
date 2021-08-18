
import React, { createContext } from 'react'
import PropTypes from 'prop-types'

export const Context = createContext({});

function HomePageProvider({
    children,
    url,
    setUrl,
  }) {
    return (
      <Context.Provider
        value={{
            url,
            setUrl,
        }}
      >
        {children}
      </Context.Provider>
    );
  }

  HomePageProvider.defaultProps = {
    url: '',
  }

  HomePageProvider.propTypes = {
    children: PropTypes.node.isRequired,
    url: PropTypes.string,
    setUrl: PropTypes.func,
  }

  export default HomePageProvider