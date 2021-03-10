const server = require('./api/server')

const port = 8000

server.listen(port, (req, res) => {
    console.log(`Server running on port: ${port}`)
})
