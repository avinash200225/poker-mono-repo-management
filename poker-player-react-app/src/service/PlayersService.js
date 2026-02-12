import axios from 'axios';

export class PlayersService {
    
    getPlayersBasicData() {
        return axios.get('assets/demo/data/players-basic.json')
                .then(res => res.data.data);
    }

    getPlayersGamesData() {
        return axios.get('assets/demo/data/players-games.json')
                .then(res => res.data.data)
    }
    getPlayersFinanceData() {
        return axios.get('assets/demo/data/players-finance.json')
                .then(res => res.data.data)
    }

}