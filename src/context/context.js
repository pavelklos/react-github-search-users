import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockReposWesBos from './mockData.js/mockRepos-wesbos';
import mockFollowers from './mockData.js/mockFollowers';
import mockFollowersWesBos from './mockData.js/mockFollowers-wesbos';
import mockUserPavelKlos from './mockData.js/mockUser-pavelklos';
import mockUserWesBos from './mockData.js/mockUser-wesbos';
import axios from 'axios';

const rootUrl = 'https://api.github.com';
const urlRateLimit = `${rootUrl}/rate_limit`;

const GithubContext = React.createContext();

// Provider, Consumer : GithubContext.Provider

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // error
  const [error, setError] = useState({ show: false, msg: '' });

  const searchGithubUser = async (user) => {
    console.log('searchGithubUser()', user);
    toggleError();
    setIsLoading(true);

    // [Get User]	  https://api.github.com/users/john-smilga
    // [Repos]      https://api.github.com/users/john-smilga/repos?per_page=100
    // [Followers]  https://api.github.com/users/john-smilga/followers
    const urlSearchGithubUser = `${rootUrl}/users/${user}`;
    const urlSearchGithubUserRepos = `${rootUrl}/users/${user}/repos?per_page=100`;
    const urlSearchGithubUserFollowers = `${rootUrl}/users/${user}/followers?per_page=100`; // /followers
    console.log('█ [AXIOS] User █', urlSearchGithubUser);
    console.log('█ [AXIOS] Repos █', urlSearchGithubUserRepos);
    console.log('█ [AXIOS] Followers █', urlSearchGithubUserFollowers);

    // user
    const response = await axios(urlSearchGithubUser).catch((error) =>
      console.log('error:', error)
    );
    if (response) {
      setGithubUser(response.data);
      // more logic here
      const { followers_url, repos_url } = response.data;
      await Promise.allSettled([
        axios(`${repos_url}?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          // console.log('results:', results)
          const [repos, followers] = results;
          // console.log('repos:', repos);
          // console.log('followers:', followers);
          const status = 'fulfilled';
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((error) => console.log('error:', error));
    } else {
      toggleError(true, 'there is no user with that username');
    }
    checkRequests();
    setIsLoading(false);
  };

  // const searchGithubUser = async (user) => {
  //   console.log('searchGithubUser()', user);
  //   toggleError();
  //   setIsLoading(true);

  //   // [Get User]	  https://api.github.com/users/john-smilga
  //   // [Repos]      https://api.github.com/users/john-smilga/repos?per_page=100
  //   // [Followers]  https://api.github.com/users/john-smilga/followers
  //   const urlSearchGithubUser = `${rootUrl}/users/${user}`;
  //   const urlSearchGithubUserRepos = `${rootUrl}/users/${user}/repos?per_page=100`;
  //   const urlSearchGithubUserFollowers = `${rootUrl}/users/${user}/followers?per_page=100`; // /followers
  //   console.log('█ [AXIOS] User █', urlSearchGithubUser);
  //   console.log('█ [AXIOS] Repos █', urlSearchGithubUserRepos);
  //   console.log('█ [AXIOS] Followers █', urlSearchGithubUserFollowers);

  //   // user
  //   const response = await axios(urlSearchGithubUser).catch((error) =>
  //     console.log('error:', error)
  //   );
  //   if (response) {
  //     setGithubUser(response.data);
  //     // more logic here
  //     const { login, followers_url } = response.data;
  //     // repos
  //     axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) =>
  //       // console.log('repos:', response)
  //       setRepos(response.data)
  //     );
  //     // followers
  //     axios(`${followers_url}?per_page=100`).then((response) =>
  //       // console.log('followers:', response)
  //       setFollowers(response.data)
  //     );
  //   } else {
  //     toggleError(true, 'there is no user with that username');
  //   }
  //   checkRequests();
  //   setIsLoading(false);
  // };

  // check rate
  const checkRequests = () => {
    // [Rate Limit]	https://api.github.com/rate_limit
    // axios(`${rootUrl}/rate_limit`)
    console.log('█ [AXIOS] Rate Limit █', urlRateLimit);
    axios(urlRateLimit)
      .then((response) => {
        const { data } = response;
        let {
          rate: { limit, remaining },
        } = data;
        // console.log(data);
        // remaining = 0
        setRequests(remaining);
        if (remaining === 0) {
          // throw an error
          toggleError(true, 'sorry, you have exceeded your hourly rate limit!');
        }
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };

  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }

  // error

  // useEffect(() => {
  //   console.log('hey app loaded');
  //   checkRequests();
  // }, []); // ON INITIAL RENDER
  useEffect(checkRequests, []); // ON INITIAL RENDER

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
