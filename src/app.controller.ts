import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, objectConstructor, objectReseter, initialSize = 5000) {
    this.objectConstructor = objectConstructor;
    this.objectReseter = objectReseter;
    this._pool = [];
    for (let i = 0; i < initialSize; i++) {
      this._addObjectToPool();
    }
  }

  _addObjectToPool() {
    const newObj = {
        alive: false,
        data: this.objectConstructor()
      };
    this._pool.push(newObj);
  }

  _allocate(object) {
    object.alive = true;
    return object;
  }

  getNew() {
    for (let i = 0; i < this._pool.length; i++) {
      if (this._pool[i].alive === false) {
        return this._allocate(this._pool[i]);
      }
    }
    return this._addObjectToPool();
  }

  release(object) {
    object.alive = false;
  }
  
  @Post('upload')
  async downloadPages(@Body() data: { urls: string[]; proxies?: string[] }) {
    const { urls, proxies } = data;
    return await this.appService.downloadPages(object({
      url: string[]
    });
  }
}
