import { BasicList, ListAction, ListContext, ListItem, Neovim, workspace } from 'coc.nvim';
import DB from './db';

export default class F5List extends BasicList {
  public readonly name = 'F5';
  public readonly description = 'CocList for coc-F5';
  public readonly defaultAction = 'exec';

  public actions: ListAction[] = [];

  constructor(nvim: Neovim, public db: DB) {
    super(nvim);

    this.addAction('exec', (item: ListItem) => {
      const command = item.data.command;
      this.db.logger.debug(`[run]: ${command}`);
      workspace.nvim.command(command);
    });
    this.addAction('modify', async (item: ListItem) => {
      workspace.openResource(await this.db.load());
    });
  }

  public async loadItems(context: ListContext): Promise<ListItem[]> {
    const arr = await this.db.loadItem();
    const res: ListItem[] = [];
    for (const item of arr) {
      const { name, description } = item;
      const label = `${name} \t ${description ? description : ''}`;
      res.push({
        label,
        filterText: name,
        data: Object.assign({}, item),
      });
    }
    return res;
  }
}
