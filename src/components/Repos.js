import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = useContext(GithubContext);

  const languages = repos.reduce((total, item) => {

    const { language, stargazers_count } = item;
    if (!language) return total

    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count }
    } else {
      total[language] = { ...total[language], value: total[language].value + 1, stars: total[language].stars + stargazers_count }
    }

    return total
  }, {})
  const mostUsed = Object.values(languages).sort((x, y) => {
    return y.value - x.value
  }).slice(0, 5);


  const mostPopular = Object.values(languages).sort((a, b) => {
    return b.stars - a.stars;
  }).map((item) => {
    return { ...item, value: item.stars }
  })

  // STEP 2 - Chart Data
  const chartData = [
    {
      label: "HTML",
      value: "13"
    },
    {
      label: "CSS",
      value: "15"
    },
    {
      label: "JS",
      value: "25"
    },
    {
      label: "React JS",
      value: "20"
    }, {
      label: "React Nactive",
      value: "8"
    }
  ];

  return <section className="section">
    <Wrapper className="section-center">
      <ExampleChart data={chartData} />
      <Pie3D data={mostUsed} />
      <Column3D data={chartData} />
      <Doughnut2D data={mostPopular} />
    </Wrapper>
  </section>
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
