/**
 * @author spring
 * @fileoverview 路由配置: amp管理系统的路由
 * @date 2016-04-29
 */
import Router from 'koa-router';
import Send from 'koa-send';

import api from './api';
import project from './project'
import login from './login'
import mock from './mock'

module.exports = [login,api,project,mock];

