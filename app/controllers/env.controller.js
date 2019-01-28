import BaseController from './base.controller';
import Env from '../models/env';

class EnvController extends BaseController {
  whitelist = [
    'environment',
    'environmenturl',
    'name',
    'property',
    'server_username',
    'server_password',
    'serverip',
    'version',
  ];
  // Create and Save a new Env
  create = (req, res) => {
    // Validate
    const params = this.filterParams(req.body, this.whitelist);
    // Create a Env
    const env = new Env({
      ...params,
      provider: 'local',
    });

    // save to db
    env
        .save()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || ' Some Error Occured',
          });
        });
  };

  // Retrieve and return all Env from the database.
  findAll = (req, res) => {
    Env.find()
        .then((envs) => {
          res.send(envs);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while retrieving Envs.',
          });
        });
  };

  // Find a single Env with a id
  findOne = (req, res) => {
    Env.findById(req.params.id)
        .then((env) => {
          if (!env) {
            return res.status(404).send({
              message: 'Env not found with id :' + req.params.id,
            });
          }
          res.send(env);
        })
        .catch((err) => {
          if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: 'Env not found with id ' + req.params.id,
            });
          }
          return res.status(500).send({
            message: 'Error retrieving env with id ' + req.params.id,
          });
        });
  };

  // Update a Env identified by the EnvId in the request
  update = (req, res) => {
    const params = this.filterParams(req.body, this.whitelist);
    // FInd Env and Update
    Env.findByIdAndUpdate(req.params.id, { ...params }, { new: true })
        .then((env) => {
          if (!env) {
            return res.status(404).send({
              message: 'Env not found with id ' + req.params.id,
            });
          }
          res.send(env);
        })
        .catch((err) => {
          if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: 'Envs not found with id ' + req.params.noteId,
            });
          }
          return res.status(500).send({
            message: 'Error updating Envs with id ' + req.params.noteId,
          });
        });
  };

  // Delete a Env with the specified EnvId in the request
  delete = (req, res) => {
    Env.findByIdAndRemove(req.params.id)
        .then((env) => {
          if (!env) {
            return res.status(404).send({
              message: 'Env not found with id ' + req.params.id,
            });
          }
          res.send({ message: 'Env deleted successfully!' });
        })
        .catch((err) => {
          if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
              message: 'Env not found with id ' + req.params.id,
            });
          }
          return res.status(500).send({
            message: 'Could not delete Envs with id ' + req.params.id,
          });
        });
  };
}
export default new EnvController();
