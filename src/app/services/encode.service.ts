import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncodeService {
  codeVerifier

  constructor() {
  }

  private getRandomString(length) {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  private base64urlencode(a) {
    var str = "";
    var bytes = new Uint8Array(a);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return btoa(str)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  getCodeVerifier(): String{
    this.codeVerifier = this.getRandomString(128);
    return this.codeVerifier;
  }

  async generateCodeChallenge(code_verifier){
    const encoder = new TextEncoder();
    const data = encoder.encode(code_verifier);
    const digest: any = await window.crypto.subtle.digest("SHA-256", data);

    var base64encoded = this.base64urlencode(digest);
    return base64encoded;
  }

}
