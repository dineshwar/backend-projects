import express, {Request, Response} from 'express';
import fs from 'node:fs';

const app = express();
const articlesDir = "./articles/"
app.set('view engine', 'ejs');



const homeAction = (req: Request, res: Response) => {
  const files = fs.readdirSync(articlesDir);
  const articleList = [];
  files.forEach(file => {
    
    const fileCon = fs.readFileSync(articlesDir+file, 'utf8');
    let fileContent = JSON.parse(fileCon);
    fileContent.fileName = file.replace('.json', '');
    articleList.push(fileContent);
  });

  res.render('pages/home', {
    articleList
  });
}

const articleAction = (req: Request, res: Response) => {
  const files = fs.readdirSync(articlesDir);
  let fileInfo = {};
  const reqFile = req.params.id;
  files.forEach(file => {
    if (`${reqFile}.json` === file) {
      fileInfo = JSON.parse(fs.readFileSync(`${articlesDir}${file}`, 'utf8'));
    }
  });
  
  if (JSON.stringify(fileInfo) == '{}') {
    res.status(404).render('pages/404')
  } else {
    res.render('pages/article', {
      fileInfo
    })
  }
}

app.get('/', homeAction);
app.get('/home', homeAction);
app.get('/article/:id', articleAction);

app.use(function(req, res, next) {
  res.status(404).render('pages/404')
})

app.listen(8080);
console.log('Server is listening on port 8080');

