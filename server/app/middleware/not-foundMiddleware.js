export const notFoundMiddleware = (req, res) =>{
    res.status(404).json({error: '404 - Api not found'})
}