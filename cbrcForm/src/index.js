import dva from 'dva';
import './index.css';


// 1. Initialize
const app = dva();




// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/login').default);
app.model(require('./models/upload').default);
app.model(require('./models/queryAndDownload').default);
app.model(require('./models/admin').default);
app.model(require('./models/task').default);
app.model(require('./models/adminSetting').default);
app.model(require('./models/userSetting').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
