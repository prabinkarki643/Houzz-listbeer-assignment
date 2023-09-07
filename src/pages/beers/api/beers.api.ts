import { AppWebRequest } from "../../../services/https/NetworkManager";
import { Beer } from "../typings";

class BeersAPI {
  fetchAllBeers(filter?:Record<string,any>) {
    return AppWebRequest<Beer[]>({
      method: "get",
      url: "/beers",
      params:{
        ...filter
      }
    });
  }
}

const beersAPI = new BeersAPI();
export default beersAPI;
