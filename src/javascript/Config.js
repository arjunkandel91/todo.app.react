const Production = false;

const Host = Production ? 'https://myapp.com/' : 'http://localhost/myapp.com/';
const StockUrl = Production ? 'https://myapp.com/stocks/' : 'https://locahost/myapp.com/stocks/';

export default {
      Production,
      Host,
      StockUrl
}