const useData = (json, weather) => {
    let obj = {};
    if (Object.keys(weather).length === 0) {
        obj['temperature'] = getLatest(json, 't2m')
        obj['humidity'] = getLatest(json, 'Humidity');
        obj['wind'] = getLatest(json, 'WindSpeedMS');
        return obj;
    } else {
        const items = weather.observation;
        for (const key in items) {
            const value = items[key]
            obj[value] = getLatest(json, weatherItems[value])
        }
        return obj;
    }
}

const getLatest = (data, item) => 
    data[item][(data[item].length -1)][1] 

const weatherItems = {
    temperature: 't2m',
    humidity: 'Humidity',
    wind: 'WindSpeedMS'
}

module.exports = {
    useData, 
    getLatest,
    weatherItems
}