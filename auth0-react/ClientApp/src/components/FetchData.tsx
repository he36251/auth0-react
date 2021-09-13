import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {Link} from 'react-router-dom';
import {ApplicationState} from '../store';
import * as WeatherForecastsStore from '../store/WeatherForecasts';
import {useAuth0} from "@auth0/auth0-react";

// At runtime, Redux will merge together...
type WeatherForecastProps =
    WeatherForecastsStore.WeatherForecastsState // ... state we've requested from the Redux store
    & typeof WeatherForecastsStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


function FetchData(props: any) {
    const {getAccessTokenSilently} = useAuth0();
    
    const renderForecastsTable = () => {
        ensureDataFetched();
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
                </thead>
                <tbody>
                {props.forecasts.map((forecast: WeatherForecastsStore.WeatherForecast) =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    const renderPagination = () => {
        const prevStartDateIndex = (props.startDateIndex || 0) - 5;
        const nextStartDateIndex = (props.startDateIndex || 0) + 5;

        return (
            <div className="d-flex justify-content-between">
                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${prevStartDateIndex}`}>Previous</Link>
                {props.isLoading && <span>Loading...</span>}
                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${nextStartDateIndex}`}>Next</Link>
            </div>
        );
    }

    const ensureDataFetched = async () => {
        const startDateIndex = parseInt(props.match.params.startDateIndex, 10) || 0;

        const accessToken = await getAccessTokenSilently();

        props.requestWeatherForecasts(startDateIndex, accessToken);
    }

    ensureDataFetched();
    
    return (
        <>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
            {renderForecastsTable()}
            {renderPagination()}
        </>
    );
}

export default connect(
    (state: ApplicationState) => state.weatherForecasts, // Selects which state properties are merged into the component's props
    WeatherForecastsStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any); // eslint-disable-line @typescript-eslint/no-explicit-any
