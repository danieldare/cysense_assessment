import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Http from '../api';
import { Back } from '../components/back';
import { Spinner } from '../components/spinner';
import { ILeague } from '../global.t';

type TStandings = {
  team: {
    name: string;
    logos: {
      href: string;
    }[];
  };
  stats: TStat[];
};

type TStat = {
  abbreviation: string;
  value: number;
  description: number;
};

interface IStanding {
  name: string;
  abbreviation: string;
  seasonDisplay: string;
  season: string;
  standings: TStandings[];
}

function Standings() {
  const [standingsDetails, setStandingsDetails] = useState<IStanding | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const { id } = useParams();
  const location = useLocation();
  const { name, logos, year } = location.state as Partial<ILeague & { year: string }>;
  const [order, setOrder] = useState('asc');

  const getStandingDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await Http<IStanding>(
        `/leagues/${id}/standings?season=${year}&sort=${order}`,
        {
          method: 'GET',
        },
      );
      setStandingsDetails(response.data as unknown as IStanding);
    } finally {
      setIsLoading(false);
    }
  }, [id, order, year]);

  useEffect(() => {
    getStandingDetails();
  }, [getStandingDetails, order, year]);

  function handleOrdering({ target: { value } }: ChangeEvent<HTMLSelectElement>) {
    setOrder(value);
  }

  return (
    <div className="container">
      <Back />
      <div className="league-details">
        <div className="leagues-image-wrapper-bg">
          <img src={logos?.dark} alt={id} className="leagues-img" />
        </div>
        <h1 className="heading-text ">{name} League</h1>
        <h1 className="heading-text ">Current Season {year}</h1>
      </div>
      <h1 className="heading-text-two">{standingsDetails?.name}</h1>
      <div>
        Order:
        <select onChange={handleOrdering}>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </div>
      <div className="standings-container">
        <div className="standing-container stat-font-small">
          <p>Country</p>
          <p>Wins</p>
          <p>Losses</p>
          <p>Draws</p>
          <p>Games Played</p>
          <p>Goals Against</p>
          <p>Points</p>
          <p>Rank Change</p>
          <p>Rank</p>
          <p>Goal Difference</p>
          <p>Point Deductions</p>
          <p>Points Per Game</p>
          <p>Overall</p>
        </div>

        {isLoading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : (
          standingsDetails?.standings.map((standing, index: number) => {
            return (
              <div className="standing-container" key={`${standing.team.name}_${index}`}>
                <div className="stat-team-detail">
                  <span>
                    {order === 'asc' ? index + 1 : standingsDetails?.standings.length - index}.{' '}
                  </span>
                  <img
                    src={standing?.team.logos[0]?.href}
                    alt={standing.team.name}
                    className="stat-logo"
                  />
                  <p className="stat-team">{`${standing.team.name}`}</p>
                </div>
                {standing.stats.map((stat) => {
                  return (
                    <div className="stat-container" key={stat.description}>
                      <p className="stat-content">{stat.value}</p>
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Standings;
