import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class AppService {
  async downloadPage(url: string, proxy?: string) {
    try {
      console.log(url);
      const response = await axios.get(url);
      const data = response.data;
      const fileName = `./downloads/${new Date().getMilliseconds()}.html`;
      fs.writeFileSync(fileName, data);
      return `Downloaded ${url}, status code: ${response.status}`;
    } catch (error) {
      throw new Error(`Error downloading ${url}: ${error.message}`);
    }
  }

  async downloadPages(urls: string[], proxies?: string[]) {
    const promises = urls.map((url) => this.downloadPage(url));
    return await Promise.all(promises);
  }
}
