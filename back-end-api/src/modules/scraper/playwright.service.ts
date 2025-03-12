import { chromium } from 'playwright';

export class PlaywrightService {
  async scrape(url: string) {
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle' });
      await Promise.race([
        page
          .locator('img')
          .first()
          .waitFor({ state: 'attached', timeout: 10000 }),
        page
          .locator('video')
          .first()
          .waitFor({ state: 'attached', timeout: 10000 }),
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

        document
          .querySelectorAll('iframe')
          .forEach((iframe) => videoUrls.push(iframe.src));

        return { imageUrls, videoUrls, error: null };
      });
      await browser.close();
      return evaluateRes;
    } catch (e) {
      await browser.close();
      return {
        error: e.message,
        imageUrls: [],
        videoUrls: [],
      };
    } finally {
    }
  }
}
