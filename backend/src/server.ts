import * as express from 'express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import controllers from './controllers';

const port = process.env.PORT || 3001;

const app = express();
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
// controllers
app.use(controllers);

app.listen(port, () => console.log(`Listening on port ${port}!`));
