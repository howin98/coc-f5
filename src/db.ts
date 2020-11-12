import fs from 'fs';
import path from 'path';
import { readDefault } from './default/default';
import { configure, getLogger, Logger } from 'log4js';
import { Command } from './model';

export default class DB {
  public logger: Logger;
  constructor(public storagePath: string, public uri: string, public filetype: string) {
    this.initStorePath();
    this.initLogSystem();
    this.logger = getLogger();
    this.logger.level = 'debug';
  }

  private initLogSystem = () => {
    const logPath = path.join(this.storagePath, 'f5.log');
    configure({
      appenders: {
        console: {
          type: 'console',
        },
        logfile: { type: 'file', filename: logPath },
      },
      categories: { default: { appenders: ['console', 'logfile'], level: 'error' } },
    });
  };

  private initStorePath = () => {
    fs.mkdir(this.storagePath, () => {});
  };

  private async readConfig(path: string): Promise<Command[]> {
    const { filetype } = JSON.parse(fs.readFileSync(path, 'utf8'));
    let res = <Command[]>filetype['*'];
    res = res.concat(<Command[]>filetype[this.filetype]);
    return res;
  }

  private async readUserDefault(): Promise<string> {
    const userPath = path.join(this.storagePath, `${this.filetype}.json`);
    return fs.existsSync(userPath) ? userPath : readDefault();
  }

  public async load(): Promise<string> {
    let preDir = this.uri;
    let dir = path.resolve(this.uri, '..').split(path.delimiter).pop() as string;
    while (preDir != dir) {
      const fileDir = path.join(dir, '.cocF5.json');
      if (fs.existsSync(fileDir)) {
        this.logger.debug(`[gain]: ${fileDir}`);
        return fileDir;
      }
      this.logger.debug(`[skim in]: ${dir}, [not find]: ${fileDir}`);
      preDir = dir;
      dir = path
        .resolve(dir as string, '..')
        .split(path.delimiter)
        .pop() as string;
    }
    return await this.readUserDefault();
  }

  public async loadItem(): Promise<Command[]> {
    const path = await this.load();
    return this.readConfig(path);
  }
}
