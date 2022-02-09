import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Http from '../api';

interface IStanding {
  name: string;
  abbreviation: string;
  seasonDisplay: string;
  season: string;
  standings: [];
}

function Standings() {
  const [_standingsDetails, setStandingsDetails] = useState<IStanding | undefined>();
  const [_isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

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

  return <div className="container">Work in Progress</div>;
}

export default Standings;
