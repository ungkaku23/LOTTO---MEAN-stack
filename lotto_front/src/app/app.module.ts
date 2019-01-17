import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './routing/app.routing';
import { Router, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { ChartsModule } from 'ng2-charts';
import { ImageCropperModule } from 'ng2-img-cropper/index';

import { RecaptchaModule } from 'ng-recaptcha';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CountryPickerModule } from 'angular2-countrypicker';
import { PushNotificationsModule } from 'ng-push';
import { QRCodeModule } from 'angularx-qrcode';
import { ClipboardModule } from 'ngx-clipboard';

import { ReversePipe } from './directives/reverse.pipe';
import { DotDateFormatPipe } from './directives/dot_date_format.pipe';
import { ConvertBlockToNumPipe } from './directives/convert_block_to_num.pipe';
import { DoubleDotTimeFormatPipe } from './directives/double_dot_time_format.pipe';
import { ToFixedPipe } from './directives/to_fixed.pipe';

import { FaqService } from './services/faqService';
import { TitleService } from './services/titleService';
import { NotificationService } from './services/notification.service';
import { LotoAuthService } from './services/auth.service';
import { HeaderService } from './services/header.service';
import { DrawService } from './services/draw.service';
import { LotteryService } from './services/lottery.service';
import { environment } from '../environments/environment';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider
} from "angular5-social-auth";
import { AngularFireModule} from 'angularfire2';

import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BHomeComponent } from './components/b-home/b-home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CheckFairPlayComponent } from './components/check-fair-play/check-fair-play.component';
import { LotteryRulesComponent } from './components/lottery-rules/lottery-rules.component';
import { BitTabsComponent } from './components/bit-tabs/bit-tabs.component';
import { DrowHistoryComponent } from './components/drow-history/drow-history.component';
import { PaginationWidgetComponent } from './components/pagination-widget/pagination-widget.component';
import { DrawDetailComponent } from './components/draw-detail/draw-detail.component';
import { FaqHomeComponent } from './components/faq-home/faq-home.component';
import { FaqCategoryComponent } from './components/faq-category/faq-category.component';


import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { DemoBuyticketComponent } from './components/demo-play/demo-buyticket/demo-buyticket.component';
import { DemoRulesComponent } from './components/demo-play/demo-rules/demo-rules.component';
import { DemoArchiveComponent } from './components/demo-play/demo-archive/demo-archive.component';
import { MypageAccountComponent } from './components/mypage/mypage-account/mypage-account.component';
import { MypageLotteryResultsComponent } from './components/mypage/mypage-lottery-results/mypage-lottery-results.component';
import { MypageDepositWithdrawComponent } from './components/mypage/mypage-deposit-withdraw/mypage-deposit-withdraw.component';
import { MypageMyhistoryComponent } from './components/mypage/mypage-myhistory/mypage-myhistory.component';
import { MypageMessageComponent } from './components/mypage/mypage-message/mypage-message.component';
import { MypageSettingsComponent } from './components/mypage/mypage-settings/mypage-settings.component';
import { ReferralProgramComponent } from './components/mypage/referral-program/referral-program.component';
import { MyReferralsComponent } from './components/mypage/my-referrals/my-referrals.component';
import { MypageDepositWithdrawHistoryComponent } from './components/mypage/mypage-deposit-withdraw-history/mypage-deposit-withdraw-history.component';
import { MpCheckboxComponent } from './components/mypage/mp-checkbox/mp-checkbox.component';
import { Bet3ArchiveComponent } from './components/bet3-play/bet3-archive/bet3-archive.component';
import { Bet3BuyticketComponent } from './components/bet3-play/bet3-buyticket/bet3-buyticket.component';
import { Bet3RulesComponent } from './components/bet3-play/bet3-rules/bet3-rules.component';
import { Bet4ArchiveComponent } from './components/bet4-play/bet4-archive/bet4-archive.component';
import { Bet4BuyticketComponent } from './components/bet4-play/bet4-buyticket/bet4-buyticket.component';
import { Bet4RulesComponent } from './components/bet4-play/bet4-rules/bet4-rules.component';
import { BetVideoComponent } from './components/bet-video/bet-video.component';
import { AuthGuard } from './guards/auth.guard';
import { VerificationComponent } from './components/verification/verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { TimeLeftComponent } from './components/time-left/time-left.component';
import { SocketService } from './services/socket.service';
import { WithdrawWalletService } from './services/withdraw_wallet.service';

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(environment.facebook_appid)
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(environment.google_clientid)
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    ReversePipe,
    DotDateFormatPipe,
    ConvertBlockToNumPipe,
    DoubleDotTimeFormatPipe,
    ToFixedPipe,

    ContainerComponent,
    HeaderComponent,
    FooterComponent,
    BHomeComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    CheckFairPlayComponent,
    LotteryRulesComponent,
    BitTabsComponent,
    DrowHistoryComponent,
    PaginationWidgetComponent,
    DrawDetailComponent,
    FaqHomeComponent,
    FaqCategoryComponent,
    PrivacyPolicyComponent,
    ContactUsComponent,
    TermsOfUseComponent,
    DemoBuyticketComponent,
    DemoRulesComponent,
    DemoArchiveComponent,
    MypageAccountComponent,
    MypageLotteryResultsComponent,
    MypageDepositWithdrawComponent,
    MypageMyhistoryComponent,
    MypageMessageComponent,
    MypageSettingsComponent,
    ReferralProgramComponent,
    MyReferralsComponent,
    MypageDepositWithdrawHistoryComponent,
    MpCheckboxComponent,
    Bet3ArchiveComponent,
    Bet3BuyticketComponent,
    Bet3RulesComponent,
    Bet4ArchiveComponent,
    Bet4BuyticketComponent,
    Bet4RulesComponent,
    BetVideoComponent,
    VerificationComponent,
    ResetPasswordComponent,
    SocialLoginComponent,
    TimeLeftComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    ChartsModule,
    ModalModule.forRoot(),
    RecaptchaModule.forRoot(),
    BrowserAnimationsModule,
    ImageCropperModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CountryPickerModule.forRoot({
      baseUrl: 'assets/countries/'
    }),
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    PushNotificationsModule,
    QRCodeModule,
    ClipboardModule
  ],
  providers: [FaqService,
              TitleService,
              NotificationService,
              LotoAuthService,
              AuthGuard,
              HeaderService,
              {
                provide: AuthServiceConfig,
                useFactory: getAuthServiceConfigs
              },
              DrawService,
              LotteryService,
              SocketService,
              WithdrawWalletService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
