import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  URL="http://localhost:8080/oauth/v2/token";

  constructor(private http: HttpClient) {
  }

  postToGetTokens(client_id, client_secret, code, code_verifier){
    const body = {
      "client_id": client_id,
      "client_secret": client_secret,
      "code": code,
      "code_verifier": code_verifier
    }
    const headers = {
      'Content-Type': "application/x-www-form-urlencoded"
    }
    return this.http.post(this.URL, null, {params: body});
  }
}
