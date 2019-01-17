import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { ContainerComponent } from '../components/container/container.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

import { BHomeComponent } from '../components/b-home/b-home.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';

import { CheckFairPlayComponent } from '../components/check-fair-play/check-fair-play.component';
import { LotteryRulesComponent } from '../components/lottery-rules/lottery-rules.component';
import { DrowHistoryComponent } from '../components/drow-history/drow-history.component';
import { DrawDetailComponent } from '../components/draw-detail/draw-detail.component';
import { FaqHomeComponent } from '../components/faq-home/faq-home.component';
import { FaqCategoryComponent } from '../components/faq-category/faq-category.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy/privacy-policy.component';
import { ContactUsComponent } from '../components/contact-us/contact-us.component';
import { TermsOfUseComponent } from '../components/terms-of-use/terms-of-use.component';
import { DemoBuyticketComponent } from '../components/demo-play/demo-buyticket/demo-buyticket.component';
import { DemoRulesComponent } from '../components/demo-play/demo-rules/demo-rules.component';
import { DemoArchiveComponent } from '../components/demo-play/demo-archive/demo-archive.component';
import { MypageAccountComponent } from '../components/mypage/mypage-account/mypage-account.component';
import { MypageLotteryResultsComponent } from '../components/mypage/mypage-lottery-results/mypage-lottery-results.component';
import { MypageDepositWithdrawComponent } from '../components/mypage/mypage-deposit-withdraw/mypage-deposit-withdraw.component';
import { MypageMyhistoryComponent } from '../components/mypage/mypage-myhistory/mypage-myhistory.component';
import { MypageMessageComponent } from '../components/mypage/mypage-message/mypage-message.component';
import { MypageSettingsComponent } from '../components/mypage/mypage-settings/mypage-settings.component';
import { ReferralProgramComponent } from '../components/mypage/referral-program/referral-program.component';
import { MyReferralsComponent } from '../components/mypage/my-referrals/my-referrals.component';
import { Bet3BuyticketComponent } from '../components/bet3-play/bet3-buyticket/bet3-buyticket.component';
import { Bet3RulesComponent } from '../components/bet3-play/bet3-rules/bet3-rules.component';
import { Bet3ArchiveComponent } from '../components/bet3-play/bet3-archive/bet3-archive.component';
import { Bet4BuyticketComponent } from '../components/bet4-play/bet4-buyticket/bet4-buyticket.component';
import { Bet4RulesComponent } from '../components/bet4-play/bet4-rules/bet4-rules.component';
import { Bet4ArchiveComponent } from '../components/bet4-play/bet4-archive/bet4-archive.component';
import { BetVideoComponent } from '../components/bet-video/bet-video.component';
import { VerificationComponent } from '../components/verification/verification.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { SocialLoginComponent } from '../components/social-login/social-login.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'loto/tophome', pathMatch: 'full' },
    {
        path: 'loto',
        component: ContainerComponent,
        children: [
            { path: 'tophome', component: BHomeComponent, data: { title: '#home-page' } },
            { path: 'register', component: RegisterComponent, data: { title: '#register-page' } },
            { path: 'login/:go', component: LoginComponent, data: { title: '#login-page' } },
            { path: 'verification/:code', component: VerificationComponent, data: { title: '#verification-page' } },
            { path: 'forgot-password', component: ForgotPasswordComponent, data: { title: '#forgotpw-page' } },
            { path: 'reset-password/:code', component: ResetPasswordComponent, data: { title: '#resetpassword-page' } },
            { path: 'check-fair-play', component: CheckFairPlayComponent, data: { title: '#checkfairplay-page' } },
            { path: 'lottery-rules', component: LotteryRulesComponent, data: { title: '#lotteryrules-page' } },
            { path: 'draws-history/:tid/:pages/:per_page', component: DrowHistoryComponent, data: { title: '#drawhistory-page' } },
            { path: 'draw-detail/:tid/:pages/:per_page/:drawindex', component: DrawDetailComponent, data: { title: '#drawdetail-page' } },
            { path: 'faq-home', component: FaqHomeComponent, data: { title: '#faq-page' } },
            { path: 'faq-category/:id', component: FaqCategoryComponent, data: { title: '#faq-page' } },
            { path: 'privacy-policy', component: PrivacyPolicyComponent, data: { title: '#privacypolicy-page' } },
            { path: 'contact-us', component: ContactUsComponent, data: { title: '#contactus-page' } },
            { path: 'terms-of-use', component: TermsOfUseComponent, data: { title: '#termsofuse-page' } },
            
            { path: 'demo-play-buyticket', component: DemoBuyticketComponent, data: { title: '#demobuyticket-page' } },
            { path: 'demo-play-rules', component: DemoRulesComponent, data: { title: '#demorules-page' } },
            { path: 'demo-play-archive', component: DemoArchiveComponent, data: { title: '#demoarchive-page' } },

            { path: 'mypage-account/:referral', component: MypageAccountComponent, canActivate: [AuthGuard], data: { title: '#mypageaccount-page' } },
            { path: 'mypage-lottery-results', component: MypageLotteryResultsComponent, canActivate: [AuthGuard], data: { title: '#mypagelotteryresults-page' } },
            { path: 'mypage-deposit-withdraw', component: MypageDepositWithdrawComponent, canActivate: [AuthGuard], data: { title: '#mypagedepositywithdraw-page' } },
            { path: 'mypage-myhistory', component: MypageMyhistoryComponent, canActivate: [AuthGuard], data: { title: '#mypagemyhistory-page' } },
            { path: 'mypage-message', component: MypageMessageComponent, canActivate: [AuthGuard], data: { title: '#mypagemessage-page' } },
            { path: 'mypage-settings/:stype', component: MypageSettingsComponent, canActivate: [AuthGuard], data: { title: '#mypagesettings-page' } },
            { path: 'referral-program', component: ReferralProgramComponent, canActivate: [AuthGuard], data: { title: '#referralprogram-page' } },
            { path: 'my-referral', component: MyReferralsComponent, canActivate: [AuthGuard], data: { title: '#myreferral-page' } },

            { path: 'bet3-play-buyticket', component: Bet3BuyticketComponent, canActivate: [AuthGuard], data: { title: '#bet3buyticket-page' } },
            { path: 'bet3-play-rules', component: Bet3RulesComponent, canActivate: [AuthGuard], data: { title: '#bet3rules-page' } },
            { path: 'bet3-play-archive', component: Bet3ArchiveComponent, canActivate: [AuthGuard], data: { title: '#bet3archivve-page' } },

            { path: 'bet4-play-buyticket', component: Bet4BuyticketComponent, canActivate: [AuthGuard], data: { title: '#bet4buyticket-page' } },
            { path: 'bet4-play-rules', component: Bet4RulesComponent, canActivate: [AuthGuard], data: { title: '#bet4rules-page' } },
            { path: 'bet4-play-archive', component: Bet4ArchiveComponent, canActivate: [AuthGuard], data: { title: '#bet4archive-page' } },

            { path: 'bet-video/:type', component: BetVideoComponent, canActivate: [AuthGuard], data: { title: '#betvideo-page' } },

            { path: 'social-login/:code', component: SocialLoginComponent, data: { title: '#login-page' } }

            /*{ path: 'food-post', component: ClFoodPostComponent, canActivate: [ClAuthGuard] },*/
        ]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
