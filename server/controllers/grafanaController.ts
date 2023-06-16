import { Request, Response, NextFunction } from 'express';
import fullDashboard from '../panels/KubernetFullDash.json';

const urlStore: { fullDashboard?: string } = {};

const grafanaController = {
  getPanels: (req: Request, res: Response, next: NextFunction) => {
    fetch('http://localhost:3000/api/dashboards/db', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dashboard: {
          id: null,
          uid: null,
          title: `KubernetSuperSpecialDashboard`,
          timezone: 'browser',
          tags: ['templated'],
          schemaVersion: 16,
          version: 0,
          refresh: '15s',
          panels: fullDashboard,
        },
        folderId: 0,
        message: '',
        overwrite: false,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        const { uid } = data;
        urlStore.fullDashboard = `http://localhost:3000/d/${uid}/KubernetSuperSpecialDashboard?theme=light&orgId=1&refresh=5s`;
        res.locals.URLS = urlStore;
        return next();
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  },
};

export default grafanaController;
