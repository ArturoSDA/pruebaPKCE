
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncodeService } from 'src/app/services/encode.service';

import { HttpParams } from "@angular/common/http";
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  client_id = '123';
  redirect_uri = 'http://localhost:4200/callback';
  code_verifier;


  constructor(private route: Router, private encodeService: EncodeService, private tokenService: TokenService){
  }

  ngOnInit(): void {
  }

  authorize(){
    this.code_verifier = this.encodeService.getCodeVerifier();
    this.encodeService.generateCodeChallenge(this.code_verifier).then(challenge => {
      let params = new HttpParams();
      params = params.set('client_id', this.client_id);
      params = params.set('redirect_uri', this.redirect_uri);
      params = params.set('code_challenge', challenge);
      let URL = 'http://localhost:8080/oauth/v2/authorize?' + params.toString();
      //console.log(challenge);
      //console.log(this.code_verifier);
      this.guardarCodeVerifier(this.code_verifier);
      this.route.navigate(["/"]).then(result=>{window.location.href = URL})
    })
  }

  private guardarCodeVerifier(codigo){
    sessionStorage.setItem('code_verifier', codigo)
  }

}
