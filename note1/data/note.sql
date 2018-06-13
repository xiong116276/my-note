--账户
DROP TABLE IF EXISTS noteAccount;
CREATE TABLE noteAccount(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(64),
    upassword VARCHAR(64)
);
INSERT INTO noteAccount VALUES
(
    NULL,"admin","123456"
);

--列表
DROP TABLE IF EXISTS noteList;
CREATE TABLE noteList(
    lid INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(64),
    type VARCHAR(64),
    title VARCHAR(10086),
    solution VARCHAR(10086),
    ltime VARCHAR(64)
);
INSERT INTO noteList Values
(
    NULL,
    "admin",
    "html",
    "添加iframe 设置属性width:100%;height:100%;会超出容器，出现滚动条",
    "原因是iframe标签与父元素之间有空格。1、去掉标签之间空格；2、iframe 添加 vertical-align: middle;",
    "2018-04-08 09:37:30"
),
(
    NULL,
    "admin",
    "css",
    "外层父元素有position:fixed;子元素添加position:fixed;不能固定，会随滚动条滚动。",
    "给滚动内容添加position:fixed。",
    "2018-04-08 09:37:30"
),
(
    NULL,
    "admin",
    "css",
    "input type=number 默认样式",
    "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: inner-spin-button !important;
    }",
    "2018-04-08 09:37:30"
),
(
    NULL,
    "admin",
    "javascript",
    "webapp 回退键退出问题:",
    "h5 plus API",
    "2018-04-08 09:37:30"
);