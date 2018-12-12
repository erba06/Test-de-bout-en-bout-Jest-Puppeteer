describe('App', () => {
  const hostName = 'http://localhost:3000';

  describe('root view', () => {
    beforeAll(async () => {
      await page.goto(`${hostName}/`, { waitUntil: 'networkidle0' });
    });

    it('should display items', async () => {
      await expect(page).toMatchElement(
        'ul[data-selector=item-list] li[data-selector=item-list-item]'
      );
    });
    describe('item list element link', () => {
      const linkSelector =
        'ul[data-selector=item-list] li[data-selector=item-list-item] a[data-selector="item-link"]';
      it('renders item list element link', async () => {
        await expect(page).toMatchElement(linkSelector);
      });

      describe('on click', () => {
        it('should navigate to item details view', async () => {
          const linkUrl = await page.$eval(linkSelector, element =>
            element.getAttribute('href')
          );
          await page.click(linkSelector);
          await expect(page.url()).toMatch(linkUrl);
        });
      });
    });
  });
});
