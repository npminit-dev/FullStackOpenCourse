require('dotenv').config()

const MNGDB_KEY = process.env.MNGDB_KEY
const PORT = 3003
const SECRET = process.env.SECRET

module.exports = {
  MNGDB_KEY,
  PORT, SECRET
}