import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    isLoading,
  } = useAuth0();
  const isUser = isAuthenticated && user;

  console.log('window.location.origin:', window.location.origin);
  console.log('useAuth0():', { isAuthenticated, isLoading, user });

  return (
    <Wrapper>
      {isUser && user.picture && <img src={user.picture} alt={user.name} />}
      {isUser && (user.name || user.nickname) && (
        <h4 className='unset'>
          Welcome,{' '}
          <strong className='unset'>
            {user.name ? user.name : user.nickname}
          </strong>
        </h4>
      )}
      {isUser ? (
        <button
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          logout
        </button>
      ) : (
        <button onClick={loginWithRedirect}>login</button>
      )}
      {isUser && (
        <small className='unset'>
          {user ? user.nickname : ''} <b>{user ? user.sub : ''}</b>
        </small>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  /* grid-template-columns: auto auto 100px; */
  grid-template-columns: auto auto 100px auto;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
    /* ADDED */
    border: 2px solid var(--clr-grey-5);
    border-radius: 5px;
    padding: 0.25rem 0.5rem;
    &:hover {
      background: lavenderblush;
    }
  }
`;

export default Navbar;
