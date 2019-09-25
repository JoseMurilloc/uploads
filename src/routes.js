const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const Post = require('./models/Post');

routes.get("/posts", async (req, res) => {
    const posts = await Post.find();
  
    return res.json(posts);
});

routes.post('/posts', multer(multerConfig).single('file'), async(req, res) => {

    const { originalname: name, size, filename: key } = req.file;

    /**
     * A forma mais eficiênte de se guarda um dado na collections
     * baseando na conexão do model.
     */
    const post = await Post.create({
        name,
        size,
        key,
        url: '',
    });   

    return res.send(post);
});

routes.delete("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    
    /*
    * remove() -> Basicamente e remove do mongodb onde lá
    * no model esta definido com função pre() que antes de
    * remove faça o que esta no callback
    */
    await post.remove();
    
    return res.send();
});

module.exports = routes;