import { UsermanagerPage } from './app.po';

describe('usermanager App', function() {
  let page: UsermanagerPage;

  beforeEach(() => {
    page = new UsermanagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
