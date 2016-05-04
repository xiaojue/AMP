/**
 * @author spring
 * @fileoverview 配置通用路由的数据表名
 * @date 2016-04-29
 */
const config = ['urls','collection','results','arguments']
module.exports = config;


// CREATE TABLE urls (
//       id int not null  AUTO_INCREMENT,
//       url VARCHAR(200),
//       type VARCHAR(50),
//       collection_id INT NOT NULL,
//       PRIMARY KEY (`id`),
//       CONSTRAINT FOREIGN KEY (collection_id) REFERENCES collection(id)
//       ON DELETE  RESTRICT  ON UPDATE CASCADE
// );

// CREATE TABLE results (
//       id int not null  AUTO_INCREMENT,
//       content text,
//       url_id INT NOT NULL,
//       PRIMARY KEY (`id`),
//       CONSTRAINT FOREIGN KEY (url_id) REFERENCES urls(id)
//       ON DELETE  RESTRICT  ON UPDATE CASCADE
// );

// CREATE TABLE arguments (
//       id int not null  AUTO_INCREMENT,
//       title varchar(50),
//       type varchar(50) default 'text',
//       value varchar(200) not null,
//       url_id INT NOT NULL,
//       PRIMARY KEY (`id`),
//       CONSTRAINT FOREIGN KEY (url_id) REFERENCES urls(id)
//       ON DELETE  RESTRICT  ON UPDATE CASCADE
// );