import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Http from '../api';
import { Spinner } from '../components/spinner';
import { ILeague } from '../global.t';

function Home() {
  const [leaguesData, setLeagues] = useState<ILeague[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const getAllLeagues = useCallback(async () => {
    try {
      const response = await Http<ILeague[]>('/leagues', {
        method: 'GET',
      });
      setLeagues(response.data);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllLeagues();
  }, [getAllLeagues]);

  return (
    <div className="container">
      <h1 className="heading-text ">All Leagues</h1>
      <h1 className="brief-text">Kindly Select a league</h1>
      <div className="leagues-wrapper">
        {isLoading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : (
          leaguesData?.map((league) => {
            return (
              <div
                key={`${league.id}`}
                className="league-container"
                onClick={() => navigate(`/leagues/${league.id}`, { state: league })}
              >
                <div className="leagues-image-wrapper-sm">
                  <img src={league.logos.dark} alt={league.id} className="leagues-img" />
                </div>
                <p className="paragraph-text">{league.name}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;
