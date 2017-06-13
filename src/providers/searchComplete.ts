import {AutoCompleteService} from 'ionic2-auto-complete';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'
import {Api} from "./api";

@Injectable()
export class SearchComplete implements AutoCompleteService {
  labelAttribute = "name";

  constructor(private api:Api) {

  }
  getResults(keyword:string) {
    return this.api.get("videos/tags")
      .map(
        result =>
        {
          return result.json()
            .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) )
        });
  }
}
