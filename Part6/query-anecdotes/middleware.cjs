module.exports = (req, res, next) => {
  let body = req.body
  if(body['content']) 
    if(body['content'].length < 5) 
      return res.status(401).send('Anecdote too short! must contain at least 5 characters')
  next()
}