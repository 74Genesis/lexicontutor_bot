import child_process from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Function runs sh script to convert sqlite tables to json.
 *
 * temporary created because sqlite3 returns fatal error in other ways
 * FATAL ERROR: Error::ThrowAsJavaScriptException napi_throw
 *
 * @param db database path
 * @param table table name
 * @param out path to output json
 * @param script converting script path
 */

export default function (db: string, table: string, out: string, script = __dirname + '/table_convert.sh') {
  try {
    const res = child_process.execSync(`sh ${script} ${db} ${table}`).toString();
    return res;
  } catch (e) {
    throw new Error('Fail to convert sqlite database table to json: ' + e?.message);
  }
}
