import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Http from '../api';
import { Back } from '../components/back';
import { Spinner } from '../components/spinner';
import { ILeague } from '../global.t';

type Types = {
  abbreviation: string;
  endDate: string;
  name: string;
  startDate: string;
};

export interface ILeagueDetails {
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
      setLeagueDetails(response.data as unknown as ILeagueDetails);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getLeagueDetails();
  }, [getLeagueDetails]);

  return (
    <div className="container">
      <Back />
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
          leagueDetails?.seasons.map((detail, index: number) => {
            return (
              <div
                key={`${detail.displayName}_${index}`}
                className="league-detail"
                onClick={() =>
                  navigate(`/leagues/${id}/standing?${detail.year}`, {
                    state: { name, logos, year: detail.year },
                  })
                }
              >
                <h2 className="standing-display-name">{detail.displayName}</h2>
                <div className="league-year">{detail.year}</div>
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
