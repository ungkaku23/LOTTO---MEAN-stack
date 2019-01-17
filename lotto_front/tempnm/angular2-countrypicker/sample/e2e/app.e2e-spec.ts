import { Angular2CountrypickerSamplePage } from './app.po';

describe('angular2-countrypicker-sample App', function() {
  let page: Angular2CountrypickerSamplePage;

  beforeEach(() => {
    page = new Angular2CountrypickerSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
