import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getHanRiver } from './action';
import './style.css'
const HanRiver = () => {
    let riverInfo = useSelector(state => state.data);
    let requestStatus = useSelector(state => state.status);

    const [query, setQuery] = useState('seoul');
    const [weather, setWeather] = useState({});
    
    const search = e => {
        if (e.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        }
    }
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Tuesday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`
    }

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHanRiver());
    }, [dispatch]);

    const api = {
        key: "70ece625277cedfcb615419cd0cdbdb8",
        base: "https://api.openweathermap.org/data/2.5/"
    }

    if (requestStatus === 'PENDING') {
        return (
            <div className="loaer">
                로딩중...
            </div>
        )
    }

    return (
        <div className={
            (typeof weather.main != "undefined")
                ? ((weather.main.temp > 16)
                    ? 'hanriver'
                    : 'hanriver2')
                : 'hanriver'}>
            <div className="hanriver-info">
                <div >
                    <main>
                        <div className="search-box">
                            <p>현재 지역을 입력해 주세요</p>
                            <input
                                type="text"
                                className="search-bar"
                                placeholder="Search.."
                                onChange={e => setQuery(e.target.value)}
                                value={query}
                                onKeyPress={search} />
                                
                        </div>
                        {(typeof weather.main != "undefined") ? (
                            <div>
                            <div className="location-box">
                                <div className="location">현재 지역 : {weather.name}, {weather.sys.country}</div>
                                <div className="date">날짜 : {dateBuilder(new Date())}</div>
                            </div>
                                <div className="weather-box">
                                    <div className="temp">
                                        현재 온도 : {Math.round(weather.main.temp)}°C
                                    </div>
                                    <div className="weather">날씨 : {weather.weather[0].main} </div>
                                </div>
                            </div>
                            ) : ('')}
                    <div  className="tick">
                      </div>
                    </main>
                </div>
                    <hr/>
            <div>
                <div style={{ fontSize: 10 }}>현제 한강 온도</div>
                <div style={{ fontSize: 15 }}>{riverInfo.temp}</div>
                <div style={{ fontSize: 10 }}>{riverInfo.time}</div>
            </div>
        </div>

        </div >
    )
};

export default HanRiver;