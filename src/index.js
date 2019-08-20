import dva from 'dva';
import 'antd/dist/antd.css';
import 'styles/main.scss';
import createLoading from 'dva-loading';
// Initialize
const app = dva({});

// Plugin
app.use(createLoading({ effects: true }));

// model
app.model(require('./models/posts').default);

// router
app.router(require('routes').default);

// start
app.start('#root');
