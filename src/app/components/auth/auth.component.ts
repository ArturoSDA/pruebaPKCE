import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  client_id="123";
  client_secret="123";
  code;
  code_verifier;

  constructor(private route: ActivatedRoute, private tokenService: TokenService) {
  }

  ngOnInit(){
    this.code_verifier = sessionStorage.getItem("code_verifier")
    this.code = this.route.snapshot.queryParamMap.get('code')
    this.tokenService.postToGetTokens(this.client_id, this.client_secret, this.code, this.code_verifier).subscribe(data => {
      console.log(data)
    })
  }


}
