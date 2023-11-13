import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm : FormGroup 

  constructor(public formBuilder:FormBuilder, public loadingCtlr: LoadingController, public authService :AuthService, public router:Router) {}

  ngOnInit() {
    this.regForm=this.formBuilder.group({
      fullname:['',[Validators.required]],
      email : ['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),

      ]],
      password:['',[
        Validators.required,
        Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-8])(?=.*[A-Z])")
      ]]

    })
  }
  get errorControl(){
    return this.regForm?.controls;
  }
  async signUp(){
    const loading=await this.loadingCtlr.create()
    await loading.present()
    if(this.regForm?.valid){
      const user=await this.authService.registerUser(this.regForm.value.email,this.regForm.value.password).catch((error)=>{
        
        console.log(error)
        loading.dismiss()
      })
      if(user){
        loading.dismiss()
        this.router.navigate(['/home'])
      }else{
        console.log('ingresa valores correctos')
        
      }
    }
  }
}
