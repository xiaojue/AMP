use amp;
create table collection (
    id int not null AUTO_INCREMENT,
    name varchar(50),
    descr varchar(200) DEFAULT '',
    creater varchar(100) DEFAULT '',
    ctime  datetime null,
    PRIMARY KEY (`id`)
);

create TABLE urls (
      id int not null  AUTO_INCREMENT,
      url VARCHAR(200),
      type VARCHAR(50),
      collection_id INT NOT NULL,
      PRIMARY KEY (`id`),
      CONSTRAINT FOREIGN KEY (collection_id) REFERENCES collection(id)
      ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE results (
      id int not null  AUTO_INCREMENT,
      content text,
      url_id INT NOT NULL,
      PRIMARY KEY (`id`),
      CONSTRAINT FOREIGN KEY (url_id) REFERENCES urls(id)
      ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE arguments (
      id int not null  AUTO_INCREMENT,
      title varchar(50),
      type varchar(50) default 'text',
      value varchar(200) not null,
      url_id INT NOT NULL,
      PRIMARY KEY (`id`),
      CONSTRAINT FOREIGN KEY (url_id) REFERENCES urls(id)
      ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE users (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `username` varchar(255) DEFAULT NULL COMMENT '账号名',
  `email` varchar(50) DEFAULT NULL COMMENT 'email',
  `department` varchar(50) DEFAULT NULL COMMENT '部门',
  `role` varchar(255) DEFAULT NULL COMMENT '角色',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `status` tinyint(2) DEFAULT NULL COMMENT '状态：1启用，0禁用',
  `limited` varchar(255) DEFAULT NULL COMMENT '控制',
  `date` bigint(15) DEFAULT NULL COMMENT 'date',
  `is_admin` tinyint(2) DEFAULT NULL COMMENT 'isAdmin = 99 超级管理员',
  `export` varchar(255) DEFAULT NULL COMMENT '导出权限',
  PRIMARY KEY (`id`)
);

CREATE TABLE members(
      id int not null  AUTO_INCREMENT,
      username varchar(200) DEFAULT '',
      email varchar(200) DEFAULT '',
      collection_id INT NOT NULL,
      PRIMARY KEY (`id`),
      CONSTRAINT FOREIGN KEY (collection_id) REFERENCES collection(id)
      ON DELETE CASCADE ON UPDATE CASCADE
);


<!--以下是在已有表的基础上增加字段的sql语句-->

#2016-05-11

alter table collection add column descr varchar(200) DEFAULT '';
alter table collection add column creater varchar(100) DEFAULT '';
alter table collection add column ctime  datetime null;