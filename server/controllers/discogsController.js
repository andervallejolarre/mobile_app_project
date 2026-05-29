const key = process.env.KEY;
const secret = process.env.SECRET;
const url = process.env.URL;
const axios = require('axios');

class DiscogsController {
    async labelSearch(req, res) {
        console.log(req.query.q);
        try {
            const labels = await axios.get(`${url}database/search?q=${req.query.q}&type=label&key=${key}&secret=${secret}`);
            let filter = labels.data.results.filter(x => (x.title.toLowerCase()).includes((req.query.q).toLowerCase()));
            res.send(filter);
        }
        catch (e) {
            res.send({ ok: false, e: e.message })
        }
    }

        async newReleases(req, res) {
        console.log(req.query.q);
        try {
            const releases = await axios.get(`${url}labels/${req.query.q}/releases?per_page=50&sort=year&sort_order=desc&key=${key}&secret=${secret}`);
            res.send(releases.data.releases);
        }
        catch (e) {
            res.send({ ok: false, e: e.message })
        }
    }
}
module.exports = new DiscogsController();