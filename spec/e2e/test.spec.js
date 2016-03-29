describe('truthy test', function () {
	it('should be truthy', function () {
		expect(true).toBe(true);
	});
});

//test e2e for the protractor
describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');

    expect(browser.getTitle()).toEqual('Super Calculator');
  });
});

// locators are used by protractor to grab elements on the page
// for instance element(by.model('first')).sendKeys(1);
