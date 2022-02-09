import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Http from '../api';
import { ILeague } from '../global.t';

interface IStanding {
  name: string;
  abbreviation: string;
  seasonDisplay: string;
  season: string;
  standings: [];
}

function Standings() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_standingsDetails, setStandingsDetails] = useState<IStanding | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const location = useLocation();
  const { name, logos, year } = location.state as Partial<ILeague & { year: string }>;

  const getStandingDetails = useCallback(async () => {
    try {
      const response = await Http<IStanding>(`/leagues/${id}/standings?season=2019&sort=asc`, {
        method: 'GET',
      });
      console.log('response', response);
      setStandingsDetails(response.data as unknown as IStanding);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getStandingDetails();
  }, [getStandingDetails]);

  return (
    <div className="container">
      <div className="league-details">
        <div className="leagues-image-wrapper-bg">
          <img src={logos?.dark} alt={id} className="leagues-img" />
        </div>
        <h1 className="heading-text ">{name} League</h1>
        <h1 className="heading-text ">Current Seasons {year}</h1>
      </div>
      Work In Progress
    </div>
  );
}

export default Standings;
