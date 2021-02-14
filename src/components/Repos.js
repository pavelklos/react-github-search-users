import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  // console.log(repos);
  const languages = repos.reduce((total, item) => {
    // console.log(item.language);
    // console.log(total);
    const { language, stargazers_count } = item;
    if (!language) return total; // language = null
    // DYNAMIC PROPERTY
    if (!total[language]) {
      // total[language] = 1;
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      // total[language] = total[language] + 1;
      // total[language] = { label: language, value: total[language].value + 1 };
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    // total[language] = 30;
    return total;
  }, {});
  console.log('languages:', languages);

  // languages = Object.values(languages)
  //   .sort((a, b) => {
  //     return b.value - a.value;
  //   })
  //   .slice(0, 5);
  // console.log(languages);

  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);
  console.log('mostUsed:', mostUsed);

  // most stars per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      // return { label: item.label, value: item.stars };
      return { ...item, value: item.stars };
    })
    .slice(0, 5);
  console.log('mostPopular:', mostPopular);

  // stars, forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      // console.log(stargazers_count, name, forks);
      // total.stars[name] = { label: name, value: stargazers_count };
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      // total.forks[name] = { label: name, value: forks };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );
  // stars = Object.values(stars)
  //   .sort((a, b) => {
  //     return b.value - a.value;
  //   })
  //   .slice(0, 5);
  stars = Object.values(stars).slice(-5).reverse();
  // forks = Object.values(forks)
  //   .sort((a, b) => {
  //     return b.value - a.value;
  //   })
  //   .slice(0, 5);
  forks = Object.values(forks).slice(-5).reverse();
  console.log('stars:', stars);
  console.log('forks:', forks);

  const chartData = [
    { label: 'HTML', value: '13' },
    { label: 'CSS', value: '160' },
    { label: 'Javascript', value: '80' },
  ];

  return (
    <section className='section'>
      <Wrapper className='section-center repos'>
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
        <ExampleChart data={chartData} />
        <div></div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
