import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Http from '../api';
import { Spinner } from '../components/spinner';
import { ILeague } from '../global.t';

type Types = {
  abbreviation: string;
  endDate: string;
  name: string;
  startDate: string;
};

interface ILeagueDetails {
  seasons: {
    displayName: string;
    endDate: string;
    startDate: string;
    year: string;
    types: Types[];
  }[];
}

function LeagueDetails() {
  const [leagueDetails, setLeagueDetails] = useState<ILeagueDetails | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const location = useLocation();
  const { name, logos } = location.state as ILeague;
  const navigate = useNavigate();

  const getLeagueDetails = useCallback(async () => {
    try {
      const response = await Http<ILeagueDetails>(`/leagues/${id}/seasons`, {
        method: 'GET',
      });

      console.log('response', response);
      setLeagueDetails(response.data as unknown as ILeagueDetails);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getLeagueDetails();
  }, [getLeagueDetails]);

  console.log('location', location);

  return (
    <div className="container">
      <div className="league-details">
        <div className="leagues-image-wrapper-bg">
          <img src={logos.dark} alt={id} className="leagues-img" />
        </div>
        <h1 className="heading-text ">{name} League</h1>
        <h1 className="heading-text ">All Seasons Standings</h1>
      </div>
      <div className="league-details-content">
        {isLoading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : (
          leagueDetails?.seasons.map((detail) => {
            return (
              <div
                className="legue-detail"
                onClick={() => navigate(`/leagues/${detail.year}/standing`)}
              >
                <h2 className="standing-display-name">{detail.displayName}</h2>
                <div className="date-wrapper">
                  <p>{new Date(detail.startDate).toDateString()}</p>
                  <p> {'=>'} </p>
                  <p>{new Date(detail.endDate).toDateString()}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default LeagueDetails;
