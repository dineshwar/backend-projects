import express, {Request, Response} from 'express';
import fs from 'node:fs';
import {Buffer} from 'node:buffer';
import bodyParser from 'body-parser';

const app = express();
const articlesDir = "./articles/";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


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
    console.log(fileInfo);
    
    res.render('pages/article', {
      fileInfo
    })
  }
}

const decodeCredentials = (auth) => {
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
  

  const filePath = articlesDir+`${reqFile}.json`;
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Article not found');
  }

  const fileCon = fs.readFileSync(filePath, 'utf8');
  const article = JSON.parse(fileCon);
  article.fileName = reqFile;

  res.render('pages/adminEdit', { article });
}

const saveEditedArticle = (req: Request, res: Response) => {
  const reqFile = req.params.id;
  const { title, date, content } = req.body;

  if (!title || !date || !content) {
    return res.status(400).send('All fields are required');
  }

  const filePath = articlesDir+`${reqFile}.json`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Article not found');
  }

  const updatedArticle = {
    title,
    content,
    "date_published": date
  };

  try {
    fs.writeFileSync(filePath, JSON.stringify(updatedArticle, null, 2)); // Pretty print with 2 spaces
    res.redirect('/admin');  // Redirect to home page or article list
  } catch (err) {
    console.error('Error saving article:', err);
    res.status(500).send('There was an error saving the article');
  }
}


const adminDelete = (req: Request, res: Response) => {
  const reqId = req.params.id;
  const filePath = articlesDir + `${reqId}.json`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Article not found');
  }
  try {
    fs.unlinkSync(filePath);
    res.redirect('/admin');
  } catch (err) {
    res.status(500).send('Unable to delete the article, right now.');
  }

}

const adminAdd = (req: Request, res: Response) => {
  console.log(req.body);
  
    const { title, date, content } = req.body;

  if (!title || !date || !content) {
    return res.status(400).send('All fields are required');
  }

  const newArticle = {
    title,
    content,
    "date_published": date
  };

  const fileName = title.replace(/\s+/g, '_').toLowerCase() + '.json';
  const filePath = articlesDir+fileName;

  try {
    fs.writeFileSync(filePath, JSON.stringify(newArticle, null, 2));
    res.redirect('/admin');
  } catch (err) {
    console.error('Error saving article:', err);
    res.status(500).send('There was an error saving the article');
  }

}

app.get('/', homeAction);
app.get('/home', homeAction);
app.get('/article/:id', articleAction, adminPage);

app.get('/admin', checkAdmin, adminPage);

app.route('/admin/add')
.get(checkAdmin,(req, res) => {
  res.render('pages/adminArticle')
})
.post(checkAdmin,adminAdd);

app.route('/admin/edit/:id')
.get(checkAdmin, adminEdit)
.post(checkAdmin, saveEditedArticle);

app.route('/admin/delete/:id')
.get(checkAdmin, adminDelete);

app.use(function(req, res, next) {
  res.status(404).render('pages/404')
})

app.listen(8080);
console.log('Server is listening on port 8080');

