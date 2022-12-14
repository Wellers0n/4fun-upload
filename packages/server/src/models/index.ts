import fs from 'fs'
import path from 'path'
import { Sequelize, DataTypes } from 'sequelize'
import * as pg from 'pg';

const basename = path.basename(__filename)
const db: any = {}

console.log(basename)
const sequelize = new Sequelize(
  // @ts-ignore
  'postgresql://postgres:postgres@postgres-db:5432/uploaddb', {
  dialectModule: pg,
  dialect: 'postgres',
  pool: {
    max: 100,
    min: 0,
    acquire: 10000,
    idle: 20000,
  },
  logging: false

}
)

fs
  .readdirSync(__dirname)
  .filter(folderFile => {
    // this is not a folder, must return to avoid crash
    if (folderFile.indexOf('.') > 0) return null

    return fs.readdirSync(path.resolve(__dirname, folderFile)).filter(file => {
      return (file.indexOf('.') !== 0) && (file === basename) && (file.slice(-3) === '.ts')
    })
  })
  .forEach(async file => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model = require(path.join(__dirname, file))(sequelize, DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// console.log(sequelize)

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db