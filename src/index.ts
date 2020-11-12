import { commands, ExtensionContext, listManager, workspace } from 'coc.nvim';
import F5List from './lists';
import DB from './db';

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration('project-manager');
  const enable = config.get<boolean>('enabled', true);
  if (!enable) return;

  const { storagePath } = context;
  const uri = workspace.uri;
  const filetype = workspace.filetypes.values().next().value;

  const db = new DB(storagePath, uri, filetype);

  context.subscriptions.push(
    commands.registerCommand('F5.Config', async () => {
      const path = await db.load();
      workspace.openResource(path);
    }),

    listManager.registerList(new F5List(workspace.nvim, db))
  );
}
