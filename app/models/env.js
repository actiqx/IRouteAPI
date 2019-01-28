import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const EnvSchema = new Schema(
    {
      environment: {
        type: String,
      },
      environmenturl: String,
      name: String,
      property: String,
      server_username: String,
      server_password: String,
      serverip: String,
      version: String,
    },
    {
      timestamps: true,
    }
);

const Env = mongoose.model('Env', EnvSchema);
export default Env;
