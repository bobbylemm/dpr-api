import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get('*', function (req, res, next) {
  const error = { statusCode: 301 };
 
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if(!error.statusCode) error.statusCode = 500

    if(error.statusCode == 301) {
        return res.status(301).json({
            message: 'This route does not exist'
        })
    }
    return res.status(500).json({ error: 'Server Error' });
});

export default app;