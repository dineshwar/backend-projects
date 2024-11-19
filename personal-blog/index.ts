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
    articleList.push(JSON.parse(fileCon))
  });
  console.log(articleList);

  res.render('pages/home', {
    articleList
  });
}

app.get('/', homeAction);
app.get('/home', homeAction);


app.listen(8080);
console.log('Server is listening on port 8080');

