#!/usr/bin/env node

'use strict'

const fs = require('fs-extra')
const os = require('os')
const path = require('path')

fs.copySync(path.join(__dirname, 'config-sample'),
  path.join(os.homedir(), 'xampp/config-sample'))
