class CurrencyExchangeService {

  getResource = async (code) => {
    const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?valcode=${code}&json`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status} `);
    }

    return this.optimizeResponse(await res.json());
  }

  optimizeResponse = (res) => {
    return {
      code: res[0].cc,
      rate: res[0].rate
    };
  }

}

export default CurrencyExchangeService;