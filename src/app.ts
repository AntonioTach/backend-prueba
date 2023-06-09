import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Routes
import UserRoutes from './routes/user.routes';

export class App {

    private app: Application; 

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares() {
        // Middleware configuration
        this.app.use(express.json()); 
        this.app.use(morgan('dev'));
        // this.app.use(cors({ origin: 'http://localhost:4200' }));
        this.app.use(cors({ origin: 'https://73c1edebfb4e.ngrok.app' }));
    }

    routes() {
        this.app.use('/users', UserRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log(`Server running on port ${this.app.get('port')}`);
    }

}