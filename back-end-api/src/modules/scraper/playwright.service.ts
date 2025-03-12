import { chromium } from 'playwright';

export class PlaywrightService {
  async scrape(url: string) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle' });
    await Promise.race([
      page.waitForSelector('img', { timeout: 10000 }),
      page.waitForSelector('video', { state: 'attached' }),
    ]);

    const evaluateRes = await page.evaluate(() => {
      const imageUrls: string[] = [];
      const videoUrls: string[] = [];
      document
        .querySelectorAll('img')
        .forEach((img) => imageUrls.push(img.src));

      document.querySelectorAll('video').forEach((video) => {
        video
          .querySelectorAll('source')
          .forEach((source) => videoUrls.push(source.src));
        if (video.src) {
          videoUrls.push(video.src);
        }
      });

      return { imageUrls, videoUrls };
    });

    await browser.close();
    return evaluateRes;
  }
}
