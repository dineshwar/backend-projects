import express, {Request, Response} from 'express';
import fs from 'node:fs';
import {Buffer} from 'node:buffer';

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

const decodeCredentials = (auth) => {
  console.log(auth);
  
  const encodedCredentials = auth
    .trim()
    .replace(/Basic\s+/i, '');
  const encode = Buffer.from('admin:admin').toString('base64');
  
  return encodedCredentials == encode;
}

const checkAdmin = (req, res, next) => {
  const isValidCred = decodeCredentials(
    req.headers.authorization || ''
  );
  if (isValidCred) {
    return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="user_pages"');
  res.status(401).send('Authentication required.');
}
const adminPage = (req: Request, res: Response) => {
  const files = fs.readdirSync(articlesDir);
  const articleList = [];
  files.forEach(file => {
    
    const fileCon = fs.readFileSync(articlesDir+file, 'utf8');
    let fileContent = JSON.parse(fileCon);
    fileContent.fileName = file.replace('.json', '');
    articleList.push(fileContent);
  });

  res.render('pages/admin', {
    articleList
  });
}

const adminEdit = (req: Request, res: Response) => {
  const reqFile = req.params.id;
}

const adminDelete = (req: Request, res: Response) => {
}

const adminAdd = (req: Request, res: Response) => {

}

app.get('/', homeAction);
app.get('/home', homeAction);
app.get('/article/:id', articleAction, adminPage);

app.get('/admin', checkAdmin, adminPage);

app.use(function(req, res, next) {
  res.status(404).render('pages/404')
})

app.listen(8080);
console.log('Server is listening on port 8080');

