import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async downloadPage(url: string, proxy?: string) {
    try {
      const response = await axios.get(url);
      return `Downloaded ${url}, status code: ${response.status}`;
    } catch (error) {
      throw new error(`Error downloading ${url}: ${error.message}`);
    }
  }

  async downloadPages(urls: string[], proxies?: string[]) {
    const promises = urls.map((url) => this.downloadPage(url));
    return await Promise.all(promises);
  }
}
