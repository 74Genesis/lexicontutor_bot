import child_process from 'child_process';

/**
 * Function runs sh script to convert sqlite tables to json file.
 *
 * temporary created because sqlite3 returns fatal error in other ways
 * FATAL ERROR: Error::ThrowAsJavaScriptException napi_throw
 *
 * @param db database path
 * @param table table name
 * @param out path to output json
 * @param script converting script path
 */

export default function (db: string, table: string, out: string, script = './table_convert.sh') {
  try {
    const res = child_process.execSync(`sh ${script} ${db} ${out} ${table}`);
    console.log(res);
  } catch (e) {
    throw new Error('Fail to convert sqlite database table to json: ' + e?.message);
  }
}
