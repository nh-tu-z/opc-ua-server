# OPC UA Server

<p align="center">
    <a href="/LICENSE"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=for-the-badge"></a>
</p>

## Requirements
TODO - add requirements

## Usage
- `npm install` to install all packages in `package.json`.
- `npm start` to run the project.
- `npm run dev-server` to run with auto-restart.

## Local environment

### Rerequisite

#### 1. EMQX
- Install EMQX at https://www.emqx.io/downloads
- Prompt to EMQX Dashboard by default at:
    ```shell
    http://localhost:18083/
    ```
  Log in with default account:
    ```shell
    $ username = admin
    $ password = public
    ```
- TODO

#### 2. MongoDB
- Provide the `mongo uri` fof the project. For example:
    ```shell
    mongodb://localhost:27017
    ```

#### 3. Environment Configuration
```shell
$ MQTT_PROTOCOL # MQTT protocol such as mqtt, mqtts, ws, wss
```

### Run the OPC UA Server
- `npm run dev-server` to run with auto-restart.
