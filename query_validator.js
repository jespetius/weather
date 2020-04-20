const validateQuery = (req, res, next) => {
    console.log('middleware');
    const values = ['temperature', 'humidity', 'wind']
    const list = req.query.observation;
    let notValidQuery = false;



    if (Object.keys(req.query).length === 0) {
        next();
    } else {
        for (const key in list) {
            console.log(list[key])
            if (!values.includes(list[key])) {
                console.log('virheellinen query')
                notValidQuery = true
                break;
            }
        }



        if (notValidQuery) {
            const err = new Error('kelvoton parametri');
            err.statusCode = 400;
            next(err);
        } else {
            console.log('ei virhettä')
            next();
        }
    }
};

module.exports = validateQuery;