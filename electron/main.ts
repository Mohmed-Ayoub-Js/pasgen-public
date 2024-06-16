import { app, BrowserWindow , Menu } from 'electron'
import path from 'node:path'
import express from 'express';
import Datastore from 'nedb';
import cors from 'cors'
import multer from 'multer';
import { autoUpdater } from 'electron-updater';
import { Notification } from 'electron';
import { port } from './public';
console.log(port);


autoUpdater.autoDownload = false;
const storage = multer.diskStorage({
  destination: (_req , _file , cb) => {
    return cb(null , "public/")
  },
  filename : (_req ,file , cb) => {
    return cb(null , `${Date.now()}_${file.originalname}`)
  }
});




process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

console.log(__dirname);


const apps = express();
apps.use(express.json());
apps.use(cors());
apps.use(express.urlencoded({ extended: true }));
const db = new Datastore({ filename: 'database/index.db', autoload: true });
const admin = new Datastore({ filename: 'database/password.db', autoload: true });
const minipasswords = new Datastore({ filename: 'database/random.db', autoload: true });
const his = new Datastore({ filename: 'database/his.db', autoload: true });
const credit = new Datastore({ filename: 'database/credit.db', autoload: true });
const fav = new Datastore({ filename: 'database/fav.db', autoload: true });

const upload = multer({storage});


// ================ START SAVE PASSWORD ON NEDB DATABASE ====================
apps.post('/savepassword', async (req, res) => {
  try {
    admin.findOne({}, (err, doc) => {
          if (err) {
              console.error('Error finding password:', err);
              res.status(500).send('Error saving password');
          } else {
              if (doc) {
                  if (req.body.password === doc.password) {
                      res.status(200).json({ message: 'تم ادخال كلمة السر الصحيحة' });
                  } else {
                      res.json({ message: 'كلمة السر ليست متطابقة' });
                  }
              } else {
                  const password = req.body.password;
                  admin.insert({ password: password }, (err, _newDoc) => {
                      if (err) {
                          console.error('Error inserting password:', err);
                          res.status(500).send('Error saving password');
                      } else {
                          res.status(200).send('Password saved successfully');
                      }
                  });
              }
          }
      });
  } catch (error) {
      console.error('Error saving password:', error);
      res.status(500).send('Error saving password');
  }
});


// ================ END SAVE PASSWORD ON NEDB DATABASE ====================

console.log("Allah akber");


// ================ START SAVE ADD SOCIAL PASSWORD DATA AND IMAGE ====================

apps.post('/savecustomdata', upload.single('photo'), (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const image = req.file ? req.file.filename : null;
    const file = req.body.image;
    db.insert({ username, password, image , file }, (err, _newDoc) => {
      if (err) {
        console.error('Error inserting custom data:', err);
        res.status(500).send('Error saving custom data');
      } else {
        res.status(200).send('Custom data saved successfully');
      }
    });
  } catch (error) {
    console.error('Error saving custom data:', error);
    res.status(500).send('Error saving custom data');
  }
});

// ================ END SAVE ADD SOCIAL PASSWORD DATA AND IMAGE ====================


console.log("Subhan Allah");

// ================ START GET ALL DATA FROM INDEX.DB TO GET DATA ====================


apps.get("/get", (_req, res) => {
  try {
    db.find({}, (err : any, docs : any) => {
      if (err) {
        console.error('Error retrieving data:', err);
        res.status(500).send('Error retrieving data');
      } else {
        res.status(200).json(docs); // إرجاع البيانات المسترجعة
      }
    });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Error retrieving data');
  }
});

// ================ END GET ALL DATA FROM INDEX.DB TO GET DATA ====================

console.log("Allah akber");


// ================ START SAVE MENI DATA TO DATABASE ====================
apps.post('/saveminipassword', async (req, res) => {
  try {
    const password = req.body.password;
    const value = req.body.value;

    minipasswords.insert({ password: password , value : value, }, (err, _newDoc) => {
      if (err) {
        console.error('Error saving mini password:', err);
        res.status(500).send('Error saving mini password');
      } else {
        res.status(200).send('Mini password saved successfully');
      }
    });
  } catch (error) {
    console.error('Error saving mini password:', error);
    res.status(500).send('Error saving mini password');
  }
});


// ================ END SAVE MENI DATA TO DATABASE ====================


console.log("Subhan Allah");

// ================ START GET ALL MINI PASSWORDS FROM DATABASE ====================

apps.get("/getminipasswords", (_req, res) => {
  try {
    minipasswords.find({}, (err : any, docs : any) => {
      if (err) {
        console.error('Error retrieving mini passwords:', err);
        res.status(500).send('Error retrieving mini passwords');
      } else {
        res.status(200).json(docs); // إرجاع السجلات المسترجعة
      }
    });
  } catch (error) {
    console.error('Error retrieving mini passwords:', error);
    res.status(500).send('Error retrieving mini passwords');
  }
});




// ================ END GET ALL MINI PASSWORDS FROM DATABASE ====================

console.log("Allah Akber - Subhan Allah");

// ================ START HISTORY SAVE DATA ====================

apps.post('/saveactivity', async (req, res) => {
  try {
    const time = new Date();
    const action = req.body.action;
    his.insert({ time, action }, (err, _newDoc) => {
      if (err) {
        console.error('Error saving activity:', err);
        res.status(500).send('Error saving activity');
      } else {
        res.status(200).send('Activity saved successfully');
      }
    });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).send('Error saving activity');
  }
});

// ================ END HISTORY SAVE DATA ====================
 
console.log("Allah Akber - Subhan Allah");


// ================ START GET HISTORY SAVE DATA ====================

apps.get('/getactivity', (_req, res) => {
  try {
    his.find({}, (err : any, docs : any) => {
      if (err) {
        console.error('Error retrieving activity:', err);
        res.status(500).send('Error retrieving activity');
      } else {
        res.status(200).json(docs);
      }
    });
  } catch (error) {
    console.error('Error retrieving activity:', error);
    res.status(500).send('Error retrieving activity');
  }
});
// ================ END GET HISTORY SAVE DATA ====================
console.log("Allah Akber - Subhan Allah");


// ================ START SET DEFAULT VALUE OF CREDIT  ====================

apps.get('/getCredit', (_req, res) => {
  credit.find({}, (err : any, docs : any) => {
      if (err) {
          console.error('Error finding credit:', err);
          res.status(500).send('Internal Server Error');
      } else {
          if (docs.length === 0) {
              const defaultCredit = 0;
              credit.insert({ value: defaultCredit }, (err, _newDoc) => {
                  if (err) {
                      console.error('Error inserting default credit:', err);
                      res.status(500).send('Internal Server Error');
                  } else {
                      res.json({ credit: defaultCredit });
                  }
              });
          } else {
              const currentCredit = docs[0].value; 

              res.json({ credit: currentCredit });
          }
      }
  });
});


// ================ END SET DEFAULT VALUE OF CREDIT ====================


// ================ START SET VALUE OF CREEDIT ====================

apps.post("/credit", (req, res) => {
  const { creditValue } = req.body;
  if (creditValue === undefined) {
    return res.status(400).json({ error: "Credit value is required" });
  }
  credit.find({}, (err : any, docs : any) => {
    if (err) {
      console.error('Error finding credit:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (docs.length === 0) {
      credit.insert({ value: creditValue, date: new Date() }, (err, newDoc) => {
        if (err) {
          console.error('Error inserting credit:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.json({ message: "Credit added successfully", credit: newDoc.value });
        }
      });
    } else {
      const existingCredit = docs[0]; 
      credit.update({ _id: existingCredit._id }, { $set: { value: creditValue, date: new Date() } }, {}, (err, _numUpdated) => {
        if (err) {
          console.error('Error updating credit:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.json({ message: "Credit updated successfully", credit: creditValue });
        }
      });
    }
  });
});


// ================ END SET VALUE OF CREEDIT ====================
apps.post('/sq', (req, res) => {
  const { quantityToSubtract } = req.body;

  if (!quantityToSubtract || quantityToSubtract <= 0) {
    return res.status(400).json({ error: "Valid quantityToSubtract is required and must be greater than 0" });
  }

  credit.findOne({}, (err, doc) => {
    if (err) {
      console.error('Error finding product:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (!doc) {
      return res.status(404).json({ error: "No product found" });
    }

    const currentQuantity = doc.value;

    if (currentQuantity < quantityToSubtract) {
      return res.status(400).json({ error: "Insufficient quantity available" });
    }

    const newQuantity = currentQuantity - quantityToSubtract;
    credit.update({}, { $set: { value: newQuantity } }, {}, (err, numUpdated) => {
      if (err) {
        console.error('Error updating product quantity:', err);
        return res.status(500).send('Internal Server Error');
      }

      if (numUpdated === 0) {
        return res.status(500).send('Failed to update product quantity');
      }

      res.json({ message: "Product quantity updated successfully", newQuantity });
    });
  });
});

// ================ START SAVE FAV  ====================

apps.post("/fav" , (req , res) => {
  try {
    const username = req.body.username;
    const image = req.body.image;  
    const file = req.body.file;  
    const id = req.body.id;

    fav.findOne({ userId: id }, (err, existingDoc) => {
      if (err) {
        console.error('Error finding document:', err);
        res.status(500).send('Error finding existing document');
      } else if (existingDoc) {
        res.json(
          {
            isSaved : true,
          }
        );
      } else {
        fav.insert({ username, image, file, userId: id }, (err, _newDoc) => {
          if (err) {
            console.error('Error inserting custom data:', err);
            res.status(500).send('Error saving custom data');
          } else {
            res.status(200).send('Custom data saved successfully');
          }
        });
      }
    });
  } catch (error) {
    console.error('Error saving custom data:', error);
    res.status(500).send('Error saving custom data');
  }  
});

// ================ END SAVE FAV ====================




// ================ END CODE USE CREDIT  ====================


// ================ END CODE USE CREDIT ====================


apps.get("/favorites", (_req, res) => {
  fav.find({}, (err : any, docs : any) => {
    if (err) {
      console.error('Error finding favorites:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(docs);
    }
  });
});

// ================ END GET FAV====================

apps.listen( port , () => {
    console.log(`
    server running Now !!
    `);
    
 } )
 autoUpdater.setFeedURL({
  provider: "github",
  owner: "Mohmed-Ayoub-Js",
  repo: "pasgen",
  releaseType:"draft",
  token:"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", 
  
});
let win: BrowserWindow | null
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true,
    },
    autoHideMenuBar:true,
  })
  const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Exit',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);
  const notification = new Notification({
    title: 'تحديث جديد',
    body: "تحديث جديد للتطبيق متاح للتطبيق",
  });

  notification.show();
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify(); 
  }
})
autoUpdater.on('update-available', () => {
  const notification = new Notification({
    title: 'تحديث جديد',
    body: "تحديث جديد للتطبيق متاح للتطبيق",
  });

  notification.show();
});

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});
app.whenReady().then(createWindow)
